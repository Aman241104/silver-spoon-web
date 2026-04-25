import { ShieldCheck, RotateCcw, Truck, Award } from "lucide-react";

const PolicySection = () => {
  const policies = [
    {
      icon: <ShieldCheck size={24} strokeWidth={1} />,
      title: "Secure Sanctuary",
      desc: "100% Encrypted Payments",
    },
    {
      icon: <RotateCcw size={24} strokeWidth={1} />,
      title: "Legacy Returns",
      desc: "7 Day Seamless Policy",
    },
    {
      icon: <Award size={24} strokeWidth={1} />,
      title: "BIS Hallmarked",
      desc: "Authentic Pure Silver",
    },
    {
      icon: <Truck size={24} strokeWidth={1} />,
      title: "Treasury Delivery",
      desc: "Secure Global Shipping",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {policies.map((policy) => (
            <div key={policy.title} className="flex flex-col items-center text-center gap-6 group">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-700">
                {policy.icon}
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-white">
                  {policy.title}
                </h4>
                <div className="w-8 h-[1px] bg-gold/30 mx-auto transition-all duration-700 group-hover:w-16" />
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">
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
