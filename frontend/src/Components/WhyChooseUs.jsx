import { Search, ShieldCheck, Route, MonitorSmartphone} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy Bus Search",
    description:
      "Find the right bus in seconds by selecting your boarding point, destination, and travel date.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Enjoy a smooth and secure booking experience with reliable payment options.",
  },
  {
    icon: Route,
    title: "Wide Route Coverage",
    description:
      "Explore buses connecting popular cities and discover routes across India.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Experience",
    description:
      "Book your journey effortlessly on desktop, tablet, or mobile devices.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold text-center text-[#111827]">
        Why Choose BookMyTrip?
      </h2>

      <p className="text-center text-[#4B5563] mt-4 mb-14 max-w-2xl mx-auto">
        Everything you need for a simple, reliable, and comfortable bus booking
        experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-5">
                <Icon size={42} className="text-[#3B82F6]" />
              </div>

              <h3 className="text-xl font-semibold text-[#111827] mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;