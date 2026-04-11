import { ShieldCheck, RotateCcw, Truck, Award } from "lucide-react";

const PolicySection = () => {
  const policies = [
    {
      icon: <ShieldCheck size={28} strokeWidth={1.5} />,
      title: "Safe & Secure Payment",
      desc: "100% Payment Protection",
    },
    {
      icon: <RotateCcw size={28} strokeWidth={1.5} />,
      title: "Easy 7 Days Return",
      desc: "No Questions Asked",
    },
    {
      icon: <Award size={28} strokeWidth={1.5} />,
      title: "100% Genuine Products",
      desc: "BIS Hallmark Authenticity",
    },
    {
      icon: <Truck size={28} strokeWidth={1.5} />,
      title: "Free Shipping",
      desc: "On orders above ₹1499",
    },
  ];

  return (
    <section className="py-12 bg-silver-50 border-y border-silver-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {policies.map((policy) => (
            <div key={policy.title} className="flex flex-col items-center text-center gap-4 group">
              <div className="text-gold group-hover:scale-110 transition-transform duration-500">
                {policy.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] uppercase tracking-ultra font-bold text-charcoal">
                  {policy.title}
                </h4>
                <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-medium">
                  {policy.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolicySection;
