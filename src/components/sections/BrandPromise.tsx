import { ShieldCheck, Award, Leaf } from "lucide-react";

const BrandPromise = () => {
  const promises = [
    {
      icon: <Award size={48} strokeWidth={1} />,
      title: "Fine Silver Jewellery",
      desc: "Crafted in 925 Sterling Silver with hallmark certifications.",
    },
    {
      icon: <ShieldCheck size={48} strokeWidth={1} />,
      title: "100% Genuine Products",
      desc: "Every product is authenticated for purity and quality.",
    },
    {
      icon: <Leaf size={48} strokeWidth={1} />,
      title: "Always Cadmium Free",
      desc: "Skin-friendly materials that ensure health and safety.",
    },
  ];

  return (
    <section className="py-24 bg-silver-50 border-t border-silver-100">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-16 uppercase tracking-ultra">
          Brand Promise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {promises.map((p) => (
            <div key={p.title} className="flex flex-col items-center text-center group">
              <div className="text-gold mb-8 group-hover:scale-110 transition-transform duration-500">
                {p.icon}
              </div>
              <h4 className="text-xs uppercase tracking-ultra font-bold text-charcoal mb-4">
                {p.title}
              </h4>
              <p className="text-sm text-charcoal/50 leading-relaxed max-w-xs uppercase tracking-widest text-[9px] font-medium">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;
