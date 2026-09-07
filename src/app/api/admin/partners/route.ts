import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";
import { z } from "zod";

/* GET  /api/admin/partners                          → list all partners
 * POST /api/admin/partners { action:"create"|"update"|"delete"|"seed", id?, partner?, descriptions? }
 */

const PartnerSchema = z.object({
  name: z.string().min(1, "Partner name is required"),
  initials: z.string().optional().nullable(),
  category_key: z.string().default("cat_corporate"),
  accent: z.string().default("#D6A34A"),
  logo: z.string().optional().nullable(),
  website: z
    .string()
    .optional()
    .nullable()
    .transform((val) => {
      if (!val || !val.trim()) return null;
      let trimmed = val.trim();
      if (!/^https?:\/\//i.test(trimmed)) {
        trimmed = `https://${trimmed}`;
      }
      return trimmed;
    }),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

export async function GET(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("partners")
    .select(`
      *,
      descriptions:partner_descriptions(*)
    `)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[admin/partners] GET error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, partners: data ?? [] });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = createServerClient();

  if (body.action === "create") {
    const p = PartnerSchema.safeParse(body.partner);
    if (!p.success) {
      const msg = p.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
      return NextResponse.json({ success: false, error: msg }, { status: 400 });
    }

    const { data: partner, error: e1 } = await supabase
      .from("partners")
      .insert(p.data)
      .select()
      .single();

    if (e1 || !partner) {
      console.error("[admin/partners] create error:", e1?.message);
      return NextResponse.json({ success: false, error: e1?.message ?? "Failed to create partner" }, { status: 500 });
    }

    if (body.descriptions) {
      const descEntries = Array.isArray(body.descriptions)
        ? body.descriptions.map((d: any) => ({
            partner_id: partner.id,
            locale: d.locale,
            description: d.description ?? null,
            role: d.role ?? null,
          }))
        : Object.entries(body.descriptions).map(([locale, d]: [string, any]) => ({
            partner_id: partner.id,
            locale,
            description: d?.description ?? null,
            role: d?.role ?? null,
          }));

      if (descEntries.length > 0) {
        await supabase.from("partner_descriptions").insert(descEntries);
      }
    }

    return NextResponse.json({ success: true, partner });
  }

  if (body.action === "update") {
    if (!body.id) {
      return NextResponse.json({ success: false, error: "Partner ID is required for update" }, { status: 400 });
    }

    const p = PartnerSchema.safeParse(body.partner);
    if (!p.success) {
      const msg = p.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
      return NextResponse.json({ success: false, error: msg }, { status: 400 });
    }

    const { data: partner, error: e1 } = await supabase
      .from("partners")
      .update(p.data)
      .eq("id", body.id)
      .select()
      .single();

    if (e1 || !partner) {
      console.error("[admin/partners] update error:", e1?.message);
      return NextResponse.json({ success: false, error: e1?.message ?? "Failed to update partner" }, { status: 500 });
    }

    if (body.descriptions) {
      const descEntries = Array.isArray(body.descriptions)
        ? body.descriptions
        : Object.entries(body.descriptions).map(([locale, d]: [string, any]) => ({
            locale,
            description: d?.description ?? null,
            role: d?.role ?? null,
          }));

      for (const d of descEntries) {
        await supabase.from("partner_descriptions").upsert(
          {
            partner_id: body.id,
            locale: d.locale,
            description: d?.description ?? null,
            role: d?.role ?? null,
          },
          { onConflict: "partner_id,locale" }
        );
      }
    }

    return NextResponse.json({ success: true, partner });
  }

  if (body.action === "delete") {
    if (!body.id) {
      return NextResponse.json({ success: false, error: "Partner ID is required for delete" }, { status: 400 });
    }

    const { error: e1 } = await supabase.from("partner_descriptions").delete().eq("partner_id", body.id);
    const { error: e2 } = await supabase.from("partners").delete().eq("id", body.id);

    if (e1 || e2) {
      console.error("[admin/partners] delete error:", e1?.message, e2?.message);
      return NextResponse.json(
        { success: false, error: e1?.message ?? e2?.message ?? "Failed to delete partner" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  }

  if (body.action === "seed") {
    const { partners: defaultList } = await import("@/lib/partners");
    let inserted = 0;

    for (let i = 0; i < defaultList.length; i++) {
      const p = defaultList[i];
      const { data: existing } = await supabase.from("partners").select("id").eq("name", p.name).single();

      if (!existing) {
        const { data: partner, error: e1 } = await supabase
          .from("partners")
          .insert({
            name: p.name,
            initials: p.initials,
            category_key: p.categoryKey,
            accent: p.accent,
            logo: p.logo,
            website: p.website || null,
            featured: p.featured ?? false,
            sort_order: i,
          })
          .select()
          .single();

        if (!e1 && partner) {
          inserted++;
          await supabase.from("partner_descriptions").insert([
            { partner_id: partner.id, locale: "en", description: p.descKey, role: p.roleKey },
          ]);
        }
      }
    }

    return NextResponse.json({ success: true, inserted });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}