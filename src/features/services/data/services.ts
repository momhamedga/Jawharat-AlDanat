import { ServiceItem, ServiceCategory } from '../types/service';

export const servicesData: ServiceItem[] = [
  {
    slug: 'paint-protection-ppf',
    category: 'automotive',
    heroImage: '/images/PPF.webp',
    galleryImages: ['/images/PPF.webp', '/images/Ceramic-2.webp'],
    title: {
      ar: 'أفلام حماية الطلاء (PPF)',
      en: 'Paint Protection Film (PPF)',
    },
    shortTitle: {
      ar: 'حماية الطلاء PPF',
      en: 'PPF Protection',
    },
    tagline: {
      ar: 'درع شفاف متطور ذاتي المعالجة لحماية الهيكل من الخدوش والحصى',
      en: 'Advanced self-healing optical shield protecting bodywork against scratches and debris',
    },
    summary: {
      ar: 'منظومة حماية بصرية متطورة تعزل طلاء المصنع الأصلي عن العوامل المناخية القاسية، الحصى المتطاير، والخدوش السطحية مع خاصية الالتئام الذاتي بفعل الحرارة.',
      en: 'A high-performance optical shield preserving original factory paint from harsh weather, road debris, and scratches with thermal self-healing capabilities.',
    },
    overview: {
      ar: 'تعد أفلام حماية الطلاء (PPF) المعيار الذهبي في حماية أسطح السيارات الفاخرة. نستخدم في جوهرة الدانة أفلام بولي يوريثان حراري متطورة بقص هندسي دقيق يغطي كافة زوايا وحواف الهيكل بدون فواصل مرئية.',
      en: 'Paint Protection Film (PPF) represents the gold standard in exterior vehicle preservation. At Jawharat Al Danat, we apply advanced thermoplastic polyurethane films with millimeter precision, wrapping edges seamlessly.',
    },
    capabilities: [
      {
        title: { ar: 'المعالجة الذاتية للخدوش', en: 'Self-Healing Properties' },
        desc: {
          ar: 'تختفي الخدوش الدقيقة ودوائر الغسيل تلقائياً عند تعرض الفيلم لحرارة الشمس أو الماء الدافئ.',
          en: 'Minor surface scratches and swirl marks disappear automatically when exposed to ambient sun heat or warm water.',
        },
      },
      {
        title: { ar: 'الحماية من الحصى والرمال', en: 'Debris & Sandstorm Shield' },
        desc: {
          ar: 'امتصاص فائق لصدمات الحصى والرمال المتطايرة على الطرق السريعة لحماية الطلاء من التقشير.',
          en: 'High-impact absorption shielding bodywork from highway gravel, sand abrasion, and environmental fallout.',
        },
      },
      {
        title: { ar: 'الشفافية البصرية العالية', en: 'High Optical Clarity' },
        desc: {
          ar: 'فيلم عالي النقاء لا يغير من لون السيارة الأصلي أو عمق الصبغة، بل يبرز لمعانها الطبيعي.',
          en: 'Ultra-clear formulation that preserves true paint color depth while enhancing natural gloss.',
        },
      },
      {
        title: { ar: 'مقاومة الإصفرار والأشعة', en: 'UV & Oxidation Resistance' },
        desc: {
          ar: 'طبقة متقدمة تقاوم الأشعة فوق البنفسجية وتمنع إصفرار الفيلم أو تغير خواصه بمرور الوقت.',
          en: 'Advanced UV barrier preventing film discoloration, yellowing, and environmental oxidation.',
        },
      },
    ],
    highlights: [
      { label: { ar: 'نوع المادة', en: 'Material Type' }, value: { ar: 'بولي يوريثان حراري (TPU)', en: 'Thermoplastic Polyurethane (TPU)' } },
      { label: { ar: 'تقنية التركيب', en: 'Installation' }, value: { ar: 'قص مخصص ولف دقيق للحواف', en: 'Precision Plotting & Edge Wrap' } },
      { label: { ar: 'المعالجة', en: 'Correction' }, value: { ar: 'التئام حراري تلقائي', en: 'Thermal Auto-Recovery' } },
    ],
    methodology: [
      {
        step: '01',
        title: { ar: 'تجهيز وإزالة الشوائب', en: 'Surface Decontamination' },
        desc: {
          ar: 'تنظيف عميق ومعالجة الطلاء بالصلصال الخاص لضمان سطح نقي 100% قبل التركيب.',
          en: 'Thorough decontamination and clay bar treatment ensuring an immaculate surface prior to film application.',
        },
      },
      {
        step: '02',
        title: { ar: 'القص الهندسي الدقيق', en: 'Precision Plotting' },
        desc: {
          ar: 'قص الفيلم وفق أبعاد طراز السيارة بدقة متناهية لتفادي استخدام الشفرات المباشرة على الطلاء.',
          en: 'Computerized templating matching vehicle panel dimensions, eliminating direct knife cuts on paint.',
        },
      },
      {
        step: '03',
        title: { ar: 'التثبيت في بيئة معقمة', en: 'Clean Chamber Application' },
        desc: {
          ar: 'تركيب الفيلم في بيئة محكمة خالية من الغبار باستخدام محاليل التثبيت المعتمدة.',
          en: 'Application inside a controlled, dust-free bay using certified slip solutions for bubble-free adhesion.',
        },
      },
      {
        step: '04',
        title: { ar: 'التدقيق ومعايرة الحواف', en: 'Edge Sealing & Inspection' },
        desc: {
          ar: 'فحص مجهري لكافة الأطراف وتثبيت الحواف بالحرارة الموجهة لضمان دوام التماسك.',
          en: 'Rigorous multi-point quality check and heat-set edge sealing to ensure durable, invisible bonding.',
        },
      },
    ],
    relatedSlugs: ['polishing-ceramic', 'heat-insulation-film'],
  },
  {
    slug: 'polishing-ceramic',
    category: 'automotive',
    heroImage: '/images/Ceramic-1.webp',
    galleryImages: ['/images/Ceramic-1.webp', '/images/Ceramic-3.webp'],
    title: {
      ar: 'التلميع الاحترافي ونانو سيراميك',
      en: 'Professional Polishing & Nano Ceramic',
    },
    shortTitle: {
      ar: 'التلميع والنانو سيراميك',
      en: 'Polishing & Ceramic',
    },
    tagline: {
      ar: 'تصحيح دقيق للطلاء مع درع سيراميكي كاره للماء يعكس البريق الزجاجي',
      en: 'Multi-stage paint correction paired with a hydrophobic ceramic barrier for mirror clarity',
    },
    summary: {
      ar: 'استعادة بريق الطلاء الأصلي وإزالة الدوائر والخدوش السطحية، متبوعة بطبقات نانو سيراميك متينة تمنح لمعاناً زجاجياً وعزلاً مائياً فائقاً.',
      en: 'Restoring original paint depth by eliminating swirl marks and minor defects, followed by durable ceramic coatings for remarkable gloss and hydrophobicity.',
    },
    overview: {
      ar: 'تجمع خدمتنا بين مهارة التصحيح الميكانيكي للطلاء وتقنيات النانو سيراميك المعتمدة. نعمل على إزالة طبقات الأكسدة والدوائر الدقيقة لنكشف عن نقاء اللون، ثم نغلفه بطبقة سيراميكية مقاومة للمواد الكيميائية والأمطار الحمضية.',
      en: 'Our service integrates multi-stage rotary paint correction with certified nano ceramic protection. We safely eliminate oxidation and micro-swirls, sealing the corrected finish in a chemical-resistant shield.',
    },
    capabilities: [
      {
        title: { ar: 'تصحيح الطلاء متعدد المراحل', en: 'Multi-Stage Paint Correction' },
        desc: {
          ar: 'إزالة الخدوش الدقيقة والدوائر وعلامات الغسيل الخاطئ واستعادة النقاء البصري للطلاء.',
          en: 'Meticulously removing swirl marks, micro-marring, and buffer trails to restore true depth.',
        },
      },
      {
        title: { ar: 'العزل الكاره للماء Hydrophobic', en: 'Hydrophobic Surface Barrier' },
        desc: {
          ar: 'تكوين زاوية تلامس مائية عالية تجعل قطرات الماء والأوساخ تنزلق بسهولة دون ترك أثر.',
          en: 'High water-contact angle creating exceptional water beading and self-cleaning performance.',
        },
      },
      {
        title: { ar: 'البريق والانعكاس الزجاجي', en: 'Mirror Gloss Reflection' },
        desc: {
          ar: 'طبقة سيراميك تعزز انعكاس الضوء وتمنح المركبة مظهراً متألقاً يشبه المعارض.',
          en: 'Enhances optical refraction, giving vehicle bodywork a wet, mirror-like showroom appearance.',
        },
      },
      {
        title: { ar: 'الحماية من الملوثات الكيميائية', en: 'Chemical & Stain Defense' },
        desc: {
          ar: 'مقاومة فضلات الطيور، الأحماض، والترسبات الكلسية التي تؤذي طبقة الكليير كوت.',
          en: 'Shields clear coat from harsh road grime, bird droppings, acid rain, and mineral deposits.',
        },
      },
    ],
    highlights: [
      { label: { ar: 'مراحل التلميع', en: 'Correction Stages' }, value: { ar: 'تصحيح متدرج فائق النعومة', en: 'Multi-Step Micro-Abrasive' } },
      { label: { ar: 'طبيعة السطح', en: 'Surface Effect' }, value: { ar: 'كاره للماء والأتربة', en: 'Superhydrophobic Barrier' } },
      { label: { ar: 'اللمعان', en: 'Finish' }, value: { ar: 'انعكاس زجاجي عميق', en: 'High-Gloss Glass Clarity' } },
    ],
    methodology: [
      {
        step: '01',
        title: { ar: 'قياس وفحص سماكة الطلاء', en: 'Paint Gauge Assessment' },
        desc: {
          ar: 'فحص سمك طبقة الكليير كوت بجهاز القياس الرقمي لتحديد الخطة الآمنة للتلميع.',
          en: 'Digital paint thickness measurement across all panels to design a safe, tailored correction approach.',
        },
      },
      {
        step: '02',
        title: { ar: 'التصحيح الميكانيكي المتدرج', en: 'Rotary & Orbital Correction' },
        desc: {
          ar: 'استخدام معاجين تلميع دقيقة وحشوات مخصصة لإزالة عيوب الطلاء بأمان كامل.',
          en: 'Employing compound-pad combinations to gently eliminate scratches and optimize gloss levels.',
        },
      },
      {
        step: '03',
        title: { ar: 'إزالة الزيوت والتطهير', en: 'Panel Prep & Degrease' },
        desc: {
          ar: 'مسح الألواح بمحلول الكحول الخاص لإزالة زيوت التلميع وكشف السطح النقي.',
          en: 'Stripping residual polishing oils with isopropyl solutions to ensure direct bonding.',
        },
      },
      {
        step: '04',
        title: { ar: 'تطبيق السيراميك والتثبيت', en: 'Ceramic Application' },
        desc: {
          ar: 'مد طبقات السيراميك بالتساوي ومعالجتها تحت الإضاءة المتخصصة لضمان التصلب المتجانس.',
          en: 'Cross-hatch application of ceramic layers followed by controlled curing for durable hardness.',
        },
      },
    ],
    relatedSlugs: ['paint-protection-ppf', 'deep-cleaning-detailing'],
  },
  {
    slug: 'deep-cleaning-detailing',
    category: 'automotive',
    heroImage: '/images/hero-cars.avif',
    galleryImages: ['/images/hero-cars.avif', '/images/about.webp'],
    title: {
      ar: 'التنظيف العميق والعناية الدقيقة (Detailing)',
      en: 'Deep Cleaning & Precision Detailing',
    },
    shortTitle: {
      ar: 'التنظيف والـ Detailing',
      en: 'Deep Cleaning & Detailing',
    },
    tagline: {
      ar: 'عناية فائقة وتطهير بالبخار لكافة أجزاء المقصورة والهيكل ومكونات الفخامة',
      en: 'Comprehensive steam sanitization and preservation for fine interior and exterior components',
    },
    summary: {
      ar: 'تنظيف متكامل ودقيق يشمل أدق تفاصيل المقصورة الداخلية، تطهير الجلد الطبيعي بالبخار، إزالة البقع العميقة، وحماية الأسطح الداخلية من التشقق والتلف.',
      en: 'Comprehensive deep detailing covering intricate cabin areas, fine leather steam sanitization, stain removal, and interior surface protection.',
    },
    overview: {
      ar: 'تتجاوز خدمة الـ Detailing مفهوم الغسيل التقليدي إلى العناية الحرفية الاستثنائية. نستخدم أجهزة البخار الجاف ومنتجات ذات درجات حموضة متوازنة للتعامل مع الجلد الطبيعي، الشامواه، ألياف الكربون، والفتحات الدقيقة دون أدنى ضرر.',
      en: 'Our detailing services elevate vehicle care far beyond standard washing. Utilizing dry vapor steam and pH-balanced solutions, we revitalize delicate materials including fine leather, Alcantara, carbon trim, and intricate air vents.',
    },
    capabilities: [
      {
        title: { ar: 'التطهير بالبخار الجاف', en: 'Dry Vapor Steam Sanitization' },
        desc: {
          ar: 'تعقيم عميق للأنسجة والمقاعد يزيل البكتيريا والروائح الكريهة دون إتلاف المكونات الكهربائية.',
          en: 'High-temperature steam sanitizing upholstery and vents, eliminating odors without excessive moisture.',
        },
      },
      {
        title: { ar: 'معالجة وترطيب الجلود الفاخرة', en: 'Fine Leather Conditioning' },
        desc: {
          ar: 'تنظيف المسام واستعادة مرونة الجلد الطبيعي مع تغذيته ببلسم يحميه من الجفاف والتشقق.',
          en: 'Gentle pore extraction and nourishing conditioner application protecting against premature drying.',
        },
      },
      {
        title: { ar: 'عناية الديكورات وألياف الكربون', en: 'Carbon & Trim Preservation' },
        desc: {
          ar: 'تنظيف وتلميع شاشات التحكم والديكورات الخشبية وألياف الكربون بفرش مخصصة فائقة النعومة.',
          en: 'Meticulous detailing of console screens, wood veneers, and carbon fiber using ultra-soft boars hair brushes.',
        },
      },
      {
        title: { ar: 'تنظيف مبيت العجلات والجنوط', en: 'Wheel & Caliper Detailing' },
        desc: {
          ar: 'إزالة غبار الفرامل المحترق والرواسب الحديدية من الجنوط والمكابح بمركبات آمنة.',
          en: 'Safe breakdown of baked-on brake dust and metallic deposits from wheels and brake calipers.',
        },
      },
    ],
    highlights: [
      { label: { ar: 'طريقة التعقيم', en: 'Sanitization' }, value: { ar: 'بخار جاف عالي الحرارة', en: 'High-Temp Dry Vapor' } },
      { label: { ar: 'المواد المستخدمة', en: 'Formulations' }, value: { ar: 'مركبات متوازنة pH للجلود الفاخرة', en: 'pH-Balanced Luxury Care' } },
      { label: { ar: 'نطاق العمل', en: 'Scope' }, value: { ar: 'مقصورة داخلية وهيكل خارجي', en: 'Comprehensive In & Out' } },
    ],
    methodology: [
      {
        step: '01',
        title: { ar: 'الفحص وتجهيز المقصورة', en: 'Pre-Detail Inspection' },
        desc: {
          ar: 'فحص نوعية الفرش والجلود وحالة البقع لتحديد المركبات ومستوى البخار المناسب.',
          en: 'Evaluating material sensitivity, leather grain, and stain types to configure the cleaning procedure.',
        },
      },
      {
        step: '02',
        title: { ar: 'التنظيف بالبخار والفرش الدقيقة', en: 'Targeted Steam Cleaning' },
        desc: {
          ar: 'تطهير فتحات التكييف والمقاعد وأحزمة الأمان والدواسات بفرش ناعمة تمنع الخدوش.',
          en: 'Detailed agitation and steam extraction across air vents, seat crevices, seatbelts, and carpets.',
        },
      },
      {
        step: '03',
        title: { ar: 'تغذية وحماية الأسطح', en: 'Conditioning & Sealing' },
        desc: {
          ar: 'تطبيق طبقة حماية غير لامعة للمقصورة تمنع تراكم الأتربة وتصد الأشعة فوق البنفسجية.',
          en: 'Applying non-greasy matte protective dressings that repel dust and shield against solar degradation.',
        },
      },
      {
        step: '04',
        title: { ar: 'التعقيم الهوائي واللمسات النهائية', en: 'Final Air Sanitization' },
        desc: {
          ar: 'معالجة دورة التكييف بنظام تنقية متقدم لإضفاء انتعاش نقي داخل المقصورة.',
          en: 'HVAC cabin air purification leaving a refreshed, neutral luxury environment.',
        },
      },
    ],
    relatedSlugs: ['polishing-ceramic', 'heat-insulation-film'],
  },
  {
    slug: 'heat-insulation-film',
    category: 'automotive',
    heroImage: '/images/Ceramic-2.webp',
    galleryImages: ['/images/Ceramic-2.webp', '/images/PPF.webp'],
    title: {
      ar: 'أفلام العزل الحراري والتظليل النانو',
      en: 'Nano Ceramic Heat Insulation Film',
    },
    shortTitle: {
      ar: 'العزل الحراري والتظليل',
      en: 'Heat Insulation Film',
    },
    tagline: {
      ar: 'تقنية عزل بصرية نانو متطورة لحجب الحرارة والأشعة فوق البنفسجية لأقصى درجات الراحة',
      en: 'Cutting-edge optical nano ceramic technology delivering thermal rejection and privacy',
    },
    summary: {
      ar: 'أفلام تظليل نانو سيراميك عالية الأداء مصممة لتوفير أقصى درجات الراحة داخل المقصورة، مع حجب فعال للأشعة فوق البنفسجية وتحسين كفاءة التكييف.',
      en: 'High-performance nano ceramic window films engineered for superior cabin thermal comfort, UV protection, and enhanced air conditioning efficiency.',
    },
    overview: {
      ar: 'صُممت أفلام العزل الحراري في جوهرة الدانة خصيصاً لتحمل درجات الحرارة المرتفعة في مناخ الإمارات. تعتمد على حبيبات السيراميك النانوية غير المعدنية التي تضمن عزل الأشعة تحت الحمراء دون أي تشويش على إشارات الهاتف أو أنظمة الملاحة.',
      en: 'Tailored specifically for the intense UAE climate, our thermal insulation films utilize non-metallic nano ceramic particles that reject infrared solar energy while maintaining clear wireless and GPS signals.',
    },
    capabilities: [
      {
        title: { ar: 'عزل الأشعة الشمسية تحت الحمراء', en: 'Infrared Thermal Rejection' },
        desc: {
          ar: 'حجب واسع لموجات الحرارة المباشرة مما يقلل من سخونة الأسطح الداخلية والمقود.',
          en: 'Substantial rejection of direct solar heat, keeping interior leather and steering surfaces comfortable.',
        },
      },
      {
        title: { ar: 'حجب الأشعة فوق البنفسجية UV', en: 'UV Radiation Protection' },
        desc: {
          ar: 'حماية الركاب والمقصورة من الأشعة الضارة التي تسبب تلف الجلد وبهتان الديكورات.',
          en: 'Shielding passengers and cabin trim against UV rays that cause skin irritation and leather fading.',
        },
      },
      {
        title: { ar: 'وضوح بصري فائق نهاراً وليلاً', en: 'High Optical Clarity' },
        desc: {
          ar: 'رؤية فائقة النقاء خالية من الضبابية أو التموج تضمن أعلى درجات الأمان أثناء القيادة.',
          en: 'Crystal-clear visibility day and night without optical distortion or hazy glares.',
        },
      },
      {
        title: { ar: 'عدم التأثير على الإشارات اللاسلكية', en: 'Zero Signal Interference' },
        desc: {
          ar: 'تركيبة غير معدنية 100% لا تعيق إشارات شبكات 5G ونظام الملاحة GPS وبطاقات البوابات.',
          en: '100% non-metallic formulation ensuring uninterrupted operation for 5G, GPS, and RFID toll tags.',
        },
      },
    ],
    highlights: [
      { label: { ar: 'التقنية', en: 'Technology' }, value: { ar: 'نانو سيراميك غير معدني', en: 'Non-Metallic Nano Ceramic' } },
      { label: { ar: 'التشويش', en: 'Interference' }, value: { ar: 'خالي من التداخل مع الإشارات', en: 'Zero Wireless Disruption' } },
      { label: { ar: 'الوضوح', en: 'Clarity' }, value: { ar: 'تباين بصري عالي وتقليل الوهج', en: 'Anti-Glare High Definition' } },
    ],
    methodology: [
      {
        step: '01',
        title: { ar: 'تنظيف الزجاج المجهري', en: 'Glass Micro-Cleaning' },
        desc: {
          ar: 'إزالة الغبار والأتربة والزيوت الدقيقة من سطح الزجاج الداخلي والخارجي.',
          en: 'Comprehensive cleaning and razor blade scraping to achieve an uncontaminated glass surface.',
        },
      },
      {
        step: '02',
        title: { ar: 'التشكيل الحراري الدقيق', en: 'Precision Heat Forming' },
        desc: {
          ar: 'تشكيل الفيلم خارجياً بالمسدس الحراري ليطابق انحناءات الزجاج الخلفي والجانبي.',
          en: 'External heat shrinking ensuring the film molds accurately to curved windshields and rear glass.',
        },
      },
      {
        step: '03',
        title: { ar: 'التثبيت الهيدروليكي المتجانس', en: 'Hydraulic Application' },
        desc: {
          ar: 'تركيب الفيلم داخلياً واستخراج السوائل بممسحة مخصصة لمنع تكون الفقاعات.',
          en: 'Internal positioning and high-pressure squeegee pass eliminating moisture and air pockets.',
        },
      },
      {
        step: '04',
        title: { ar: 'الفحص البصري والختام', en: 'Final Curing & Inspection' },
        desc: {
          ar: 'معاينة الزوايا والتأكد من مطابقة الحواف مع إرشادات ما بعد التركيب للعميل.',
          en: 'Edge inspection and quality sign-off with clear post-installation care instructions.',
        },
      },
    ],
    relatedSlugs: ['paint-protection-ppf', 'polishing-ceramic'],
  },
  {
    slug: 'events-conferences',
    category: 'events',
    heroImage: '/images/Events-Conferences-Services.webp',
    galleryImages: ['/images/Events-Conferences-Services.webp', '/images/Speakers-1.webp'],
    title: {
      ar: 'إدارة الفعاليات والمؤتمرات الكبرى',
      en: 'Events & Conferences Management',
    },
    shortTitle: {
      ar: 'الفعاليات والمؤتمرات',
      en: 'Events & Conferences',
    },
    tagline: {
      ar: 'تخطيط استراتيجي وتنفيذ هندسي متكامل للمؤتمرات والمعارض والملتقيات الرسمية',
      en: 'Strategic planning and spatial execution for high-level summits and exhibitions',
    },
    summary: {
      ar: 'حلول تنظيمية متكاملة للمؤتمرات والمعارض والملتقيات الرسمية والتجارية، تشمل تصميم الفضاءات، تجهيز المنصات، المنظومات الصوتية والمرئية، وإدارة الحشود.',
      en: 'End-to-end planning and delivery for corporate summits, exhibitions, and official forums, encompassing spatial design, stage rigging, audiovisuals, and attendee management.',
    },
    overview: {
      ar: 'تقدم جوهرة الدانة منظومة متكاملة لإدارة المؤتمرات والفعاليات في أبوظبي ودبي. من التصميم المعماري للمنصات وقاعات العرض إلى إدارة البث المباشر والأنظمة الصوتية المتقدمة، نضمن تنفيذ الحدث بأعلى معايير الانضباط والاحترافية.',
      en: 'Jawharat Al Danat delivers unified conference and event solutions across Abu Dhabi and Dubai. From stage architecture and exhibition booth builds to live broadcast management and immersive AV, we ensure absolute institutional rigor.',
    },
    capabilities: [
      {
        title: { ar: 'هندسة وتصميم الفضاءات والمنصات', en: 'Venue & Stage Spatial Architecture' },
        desc: {
          ar: 'تصميم ديكور مخصص ثلاثي الأبعاد وتنفيذ منصات المحاضرين وقاعات ورش العمل.',
          en: 'Custom 3D stage concepts, exhibition booth construction, and breakout workshop layouts.',
        },
      },
      {
        title: { ar: 'المنظومات الصوتية والمرئية المتقدمة', en: 'Audiovisual & Stage Engineering' },
        desc: {
          ar: 'شاشات عرض تفاعلية LED، أنظمة صوت رقمية، وإضاءة مسرحية متزامنة مع فقرات الفعالية.',
          en: 'High-definition LED display walls, line-array acoustics, and dynamic stage lighting systems.',
        },
      },
      {
        title: { ar: 'إدارة التسجيل والوفود', en: 'Registration & Delegate Logistics' },
        desc: {
          ar: 'منظومات إلكترونية لإصدار الشارات، إدارة نقاط الدخول، وتسهيل تجربة الضيوف.',
          en: 'Digital badge accreditation, seamless registration counters, and delegate flow coordination.',
        },
      },
      {
        title: { ar: 'الإنتاج والتوثيق الإعلامي', en: 'Media Production & Live Streaming' },
        desc: {
          ar: 'تصوير سينمائي متعدد الكاميرات، بث مباشر للمنصات، وتغطية صحفية وتوثيق أرشيفي.',
          en: 'Multi-camera broadcast production, live streaming feeds, and archival high-resolution media capture.',
        },
      },
    ],
    highlights: [
      { label: { ar: 'النطاق', en: 'Scope' }, value: { ar: 'مؤتمرات حكومية وخاصة', en: 'Government & Corporate Summits' } },
      { label: { ar: 'التجهيز', en: 'Execution' }, value: { ar: 'منصات وشاشات تفاعلية', en: 'Interactive Stage & AV Builds' } },
      { label: { ar: 'الإدارة', en: 'Management' }, value: { ar: 'فرق عمل لوجستية محترفة', en: 'Dedicated Operational Taskforce' } },
    ],
    methodology: [
      {
        step: '01',
        title: { ar: 'دراسة المفهوم وتخطيط المساحة', en: 'Concept Formulation & CAD' },
        desc: {
          ar: 'تحديد أهداف الفعالية ورسم المخططات الهندسية وتوزيع المقاعد والمنصات.',
          en: 'Translating event objectives into detailed CAD layouts, seating arrangements, and production schedules.',
        },
      },
      {
        step: '02',
        title: { ar: 'الإنشاء والتركيب التقني', en: 'Technical Rigging & Build' },
        desc: {
          ar: 'بناء الهياكل وتركيب الشاشات ومكبرات الصوت وضبط الإضاءة المسرحية.',
          en: 'Constructing custom stages, hanging trusses, calibrating acoustic lines, and testing LED panels.',
        },
      },
      {
        step: '03',
        title: { ar: 'البروفات الشاملة ومطابقة التوقيت', en: 'Run-Through & Rehearsals' },
        desc: {
          ar: 'إجراء بروفات تقنية كاملة مع المتحدثين ومزامنة العروض التقديمية والصوت.',
          en: 'Full technical rehearsals, AV cue coordination, speaker mic checks, and presentation flow testing.',
        },
      },
      {
        step: '04',
        title: { ar: 'الإدارة المباشرة والتسليم', en: 'Live Show Direction' },
        desc: {
          ar: 'إدارة غرفة التحكم خلال المؤتمر وضمان سير الفقرات بدقة تامة وحتى ختام الحدث.',
          en: 'Real-time production calling, backstage management, and post-event reporting.',
        },
      },
    ],
    relatedSlugs: ['vip-event-management'],
  },
  {
    slug: 'vip-event-management',
    category: 'events',
    heroImage: '/images/Speakers-1.webp',
    galleryImages: ['/images/Speakers-1.webp', '/images/Speakers-2.webp', '/images/Speakers-3.webp'],
    title: {
      ar: 'تنظيم وإدارة فعاليات كبار الشخصيات VIP',
      en: 'VIP Event Management & Protocol',
    },
    shortTitle: {
      ar: 'فعاليات كبار الشخصيات VIP',
      en: 'VIP Event Protocol',
    },
    tagline: {
      ar: 'بروتوكول سيادي وضيافة استثنائية للوفود الدبلوماسية والمناسبات النخبوية',
      en: 'Sovereign protocol and elite hospitality for dignitaries and high-level delegations',
    },
    summary: {
      ar: 'إدارة دقيقة وشاملة للمناسبات الخاصة واستقبال الوفود الدبلوماسية والشخصيات الرفيعة، مع الالتزام بأعلى معايير الخصوصية، الانضباط، والضيافة الإماراتية الأصيلة.',
      en: 'Meticulous hosting and coordination for diplomatic delegations and high-profile private events, adhering to royal hospitality standards, confidentiality, and sovereign protocol.',
    },
    overview: {
      ar: 'نقدم خدمات إدارة فعاليات كبار الشخصيات بمستوى بروتوكولي استثنائي. نحرص على أدق التفاصيل من تصميم أجنحة الاستقبال الفاخرة وتدريب فرق الضيافة على قواعد اللباقة والبروتوكول، وحتى تنظيم مسارات الوصول الآمنة لضيوف الدولة والشخصيات البارزة.',
      en: 'We provide VIP event management governed by diplomatic precision and confidentiality. From bespoke VIP majlis staging and protocol-trained hospitality staff to discreet VIP transit and secure reception pathways.',
    },
    capabilities: [
      {
        title: { ar: 'البروتوكول والاستقبال الدبلوماسي', en: 'Diplomatic & Sovereign Protocol' },
        desc: {
          ar: 'تطبيق قواعد الأسبقية والبروتوكولات الرسمية المعتمدة في استقبال وتوديع كبار الضيوف.',
          en: 'Adhering to strict precedence rules, diplomatic courtesy, and sovereign reception standards.',
        },
      },
      {
        title: { ar: 'أجنحة كبار الشخصيات والضيافة الفاخرة', en: 'VIP Majlis & Exclusive Hospitality' },
        desc: {
          ar: 'تجهيز صالات استقبال ومجالس خاصة تعكس أصالة الضيافة الإماراتية بأعلى معايير الفخامة.',
          en: 'Designing tailored private majlis suites featuring refined Emirati hospitality and curated amenities.',
        },
      },
      {
        title: { ar: 'إدارة الأساطيل والتنقل الآمن', en: 'Fleet Coordination & Access' },
        desc: {
          ar: 'تنسيق مواكب النقل ومسارات الوصول والمغادرة الخاصة لضمان الانسيابية والراحة الكاملة.',
          en: 'VIP motorcade route planning, designated private drop-offs, and discreet transit coordination.',
        },
      },
      {
        title: { ar: 'الخصوصية التامة والسرية المهنية', en: 'Absolute Discretion & Privacy' },
        desc: {
          ar: 'الالتزام التام بحماية خصوصية الضيوف وإدارة الفعالية في إطار من السرية والانضباط.',
          en: 'Strict non-disclosure compliance, secure perimeter coordination, and confidential event governance.',
        },
      },
    ],
    highlights: [
      { label: { ar: 'المعيار', en: 'Standard' }, value: { ar: 'بروتوكولات القصور والوفود', en: 'Sovereign Diplomatic Protocol' } },
      { label: { ar: 'الكادر', en: 'Taskforce' }, value: { ar: 'فرق مدربة على أعلى قواعد اللباقة', en: 'Protocol-Trained Personnel' } },
      { label: { ar: 'الخصوصية', en: 'Confidentiality' }, value: { ar: 'سرية وأمان مهني متكامل', en: 'Strict Privacy Compliance' } },
    ],
    methodology: [
      {
        step: '01',
        title: { ar: 'تخطيط البروتوكول والمسارات', en: 'Protocol & Access Planning' },
        desc: {
          ar: 'تصميم خطة سير الضيوف وتحديد أسبقية الجلوس والتنسيق المسبق مع الجهات المعنية.',
          en: 'Designing seating charts, VIP access corridors, and coordination protocols with hosting delegates.',
        },
      },
      {
        step: '02',
        title: { ar: 'تجهيز أجنحة الاستقبال', en: 'VIP Suite Setup' },
        desc: {
          ar: 'إعداد الصالات والمجالس وتزويدها بالديكورات المخصصة والضيافة الملكية المتكاملة.',
          en: 'Furnishing private majlis areas with bespoke floral arrangements, executive amenities, and fine dining service.',
        },
      },
      {
        step: '03',
        title: { ar: 'الاستقبال والمرافقة الشخصية', en: 'Reception & Delegation Escort' },
        desc: {
          ar: 'إدارة لحظات الوصول والمرافقة إلى القاعات عبر مسارات مخصصة بدون تأخير.',
          en: 'Managing arrival timings, dignitary greetings, and swift escorted entry to private lounges.',
        },
      },
      {
        step: '04',
        title: { ar: 'الإشراف المستمر والختام', en: 'On-Site Supervision & Departure' },
        desc: {
          ar: 'متابعة احتياجات كبار الشخصيات على مدار الساعة وتأمين المغادرة الانسيابية.',
          en: 'Dedicated on-site protocol marshals monitoring every interaction through final departures.',
        },
      },
    ],
    relatedSlugs: ['events-conferences'],
  },
];

export function getAllServices(): ServiceItem[] {
  return servicesData;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): ServiceItem[] {
  return servicesData.filter((s) => s.category === category);
}

export function getRelatedServices(slugs: string[]): ServiceItem[] {
  return servicesData.filter((s) => slugs.includes(s.slug));
}
