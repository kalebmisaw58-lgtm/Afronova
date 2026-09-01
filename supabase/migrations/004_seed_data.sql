-- ===============================================================
-- AfroNova — Seed Data (004)
-- Inserts default content so the CMS has data on first deploy.
-- Safe to re-run: uses ON CONFLICT DO NOTHING.
-- ===============================================================

-- ── 1. Footer contact keys ─────────────────────────────────────
insert into public.site_content (locale, key, value, section)
values
  ('en', 'footer_address', 'Africa Avenue, Addis Ababa 1000, Ethiopia', 'footer'),
  ('en', 'footer_phone',    '+251 96 508 1998',                         'footer'),
  ('en', 'footer_hours',    'Mon  to  Fri, 9:00 AM  to  5:00 PM',      'footer'),
  ('en', 'footer_map_url',  'https://maps.app.goo.gl/WfyUFKJmgt7YLtpZ9', 'footer'),
  ('en', 'footer_instagram','https://www.instagram.com/afronova__',       'footer'),
  ('en', 'footer_facebook', 'https://www.facebook.com/share/19FxHLrzQD/','footer'),
  ('en', 'footer_twitter',  'https://x.com/socialafronova',              'footer'),
  ('en', 'footer_youtube',  'https://youtube.com/afronova',              'footer'),
  ('en', 'footer_linkedin', 'https://www.linkedin.com/company/afronova-mediahub/', 'footer'),
  ('en', 'footer_tiktok',   'https://www.tiktok.com/@afronova_',         'footer')
on conflict (locale, key) do nothing;

-- ── 2. Default partners ────────────────────────────────────────
insert into public.partners (name, initials, category_key, accent, logo, website, featured, sort_order)
values
  ('African Union',            'AU',  'cat_institutional', '#D6A34A', 'african-union.png',         'https://au.int',                true,  0),
  ('UNECA (ECA)',              'ECA', 'cat_institutional', '#B9853B', 'uneca.png',                'https://uneca.org',             true,  1),
  ('Legendary Gold',           'LG',  'cat_strategic',     '#F0B84F', 'legendary-gold.png',       'https://legendarygold.co.uk',   true,  2),
  ('British Council',          'BC',  'cat_cultural',      '#9A6A31', 'british-council.png',      'https://britishcouncil.org',    false, 3),
  ('Ethiopian Airlines',       'ET',  'cat_corporate',     '#D6A34A', 'ethiopian-airlines.png',   'https://ethiopianairlines.com', true,  4),
  ('European Union',           'EU',  'cat_diplomatic',    '#B9853B', 'european-union.png',       'https://europa.eu',             false, 5),
  ('Embassy of Nigeria',       'NG',  'cat_diplomatic',    '#9A6A31', 'nigeria-embassy.png',      'https://ng.indembassy.gov.et',  false, 6),
  ('Embassy of Burundi',       'BI',  'cat_diplomatic',    '#F0B84F', 'burundi-embassy.png',      'https://bi.indembassy.gov.et',  false, 7),
  ('Embassy of Côte d''Ivoire','CI',  'cat_diplomatic',    '#D6A34A', 'ivory-coast-embassy.png',  'https://ci.indembassy.gov.et',  false, 8),
  ('New Zealand Embassy',      'NZ',  'cat_diplomatic',    '#B9853B', 'nz-embassy.png',           'https://nzembassy.org',         false, 9),
  ('US Mission to AU',         'USAU','cat_diplomatic',    '#477A9D', 'images.jpg',               'https://usau.usmission.gov',    false, 10),
  ('Kana TV',                  'KT',  'cat_media',         '#9A6A31', 'kana-tv.png',              'https://kanatv.com',            false, 11),
  ('Skylight Hotel',           'SH',  'cat_hospitality',   '#F0B84F', 'skylight-hotel.png',       'https://skylighthotels.com',    false, 12),
  ('Ethiopia Tourism',         'ET2', 'cat_government',    '#9A6A31', 'ethiopia-tourism.png',     'https://ethiopia.travel',       false, 13),
  ('Africa Fashion Reception', 'AF',  'cat_cultural',      '#9A6A31', 'africa-fashion-reception.png','https://africafashionreception.com', false, 14)
on conflict (name) do nothing;

-- Partner descriptions (English only — other locales can be added via CMS)
insert into public.partner_descriptions (partner_id, locale, description, role)
select p.id, 'en', d.description, d.role
from public.partners p
join (values
  ('African Union',             'The continental body uniting 55 African states. AfroNova hosts flagship events at AU Headquarters in Addis Ababa.', 'Venue & Institutional Partner'),
  ('UNECA (ECA)',               'The United Nations Economic Commission for Africa, co-venue for Africa Celebrates and a key partner in framing intra-African trade and economic forums.', 'Venue & Economic Forum Partner'),
  ('Legendary Gold',            'AfroNova''s principal international strategic partner. Legendary Gold brings global investment, networks and expertise to every AfroNova initiative.', 'Principal Strategic Partner'),
  ('British Council',           'The UK''s international organisation for cultural relations. A key partner in advancing arts, education and Pan-African creative exchange.', 'Cultural Exchange Partner'),
  ('Ethiopian Airlines',        'Africa''s largest and most awarded airline. Official airline partner providing connectivity for delegates attending AfroNova events.', 'Official Airline Partner'),
  ('European Union',            'The EU''s Delegation to Ethiopia supports cultural diplomacy and intra-African development programmes at AfroNova events.', 'Diplomatic Partner'),
  ('Embassy of Nigeria',        'Representing West Africa''s largest economy, facilitating bilateral trade and cultural participation at AfroNova events.', 'Diplomatic Partner, West Africa'),
  ('Embassy of Burundi',        'Supporting East African representation and community engagement at Pan-African events hosted by AfroNova.', 'Diplomatic Partner, East Africa'),
  ('Embassy of Côte d''Ivoire','Connecting Francophone West Africa to AfroNova''s network, supporting cultural and business exchange across the continent.', 'Diplomatic Partner, Francophone Africa'),
  ('New Zealand Embassy',       'Bridging African and Pacific perspectives, supporting international dialogue and cultural programming through AfroNova.', 'International Diplomatic Partner'),
  ('US Mission to AU',          'The United States Mission to the African Union advances US-Africa relations and supports dialogue, partnership and shared prosperity across the continent.', 'Diplomatic Partner, African Union'),
  ('Kana TV',                   'One of Ethiopia''s leading entertainment channels. Kana TV provides broadcast reach and media coverage for AfroNova events.', 'Broadcast Media Partner'),
  ('Skylight Hotel',            'Addis Ababa''s iconic luxury hotel. Official hospitality partner for AfroNova''s VIP delegates, artists and international guests.', 'Official Hospitality Partner'),
  ('Ethiopia Tourism',          'The Ethiopian Tourism Organisation positions Addis Ababa as Africa''s premier destination for Pan-African culture and commerce.', 'Tourism & Destination Partner'),
  ('Africa Fashion Reception',  'A leading platform for Pan-African fashion excellence. Co-presents the Gala Fashion Night at Africa Celebrates.', 'Fashion & Cultural Partner')
) as d(name, description, role) on p.name = d.name
on conflict (partner_id, locale) do nothing;

-- ── 3. Default news articles ───────────────────────────────────
insert into public.news_articles (slug, locale, category, article_date, read_time, title, excerpt, paragraphs, published, sort_order)
values
  ('africa-celebrates-2026-announced', 'en', 'event',     'July 10, 2026', '4 min read',
   'Africa Celebrates 2026, 6th Edition Officially Announced for November in Addis Ababa',
   'AfroNova confirms the 6th edition of Africa Celebrates, taking place November 10 to 15 at AU HQ and UNECA.',
   array['AfroNova Media House & Events is proud to announce Africa Celebrates 2026, the sixth edition of the continent''s Pan-African festival. The event will take place November 10 to 15, 2026 at the African Union Headquarters and the United Nations Economic Commission for Africa in Addis Ababa, Ethiopia.',
         'This year''s theme, One Africa, One People, brings culture, innovation and enterprise together on one world-class stage.',
         'The programme includes gala fashion and awards nights, a business and trade forum, and an open exhibition for artisans, vendors and corporate delegations from across Africa and the diaspora.'],
   true, 0),
  ('legendary-gold-partnership', 'en', 'partnership', 'June 28, 2026', '3 min read',
   'AfroNova and Legendary Gold Strengthen Their Partnership',
   'The partnership expands the event''s reach and strengthens its commitment to African creative excellence.',
   array['AfroNova and Legendary Gold Limited are extending their collaboration for Africa Celebrates 2026.',
         'The partnership supports a stronger international platform for African culture, enterprise and creative talent.'],
   true, 1),
  ('au-uneca-venues-confirmed', 'en', 'event', 'May 30, 2026', '3 min read',
   'AU and UNECA Venues Confirmed for Africa Celebrates 2026',
   'The festival will convene across two of Addis Ababa''s most significant continental institutions.',
   array['The African Union Headquarters and UNECA have been confirmed as the venues for Africa Celebrates 2026.',
         'The two locations reflect the festival''s commitment to continental connection, dialogue and shared prosperity.'],
   true, 2)
on conflict (slug, locale) do nothing;
