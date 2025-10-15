import { WelcomeBenefits } from '@/components/welcome-benefits';
import { WelcomeFooter } from '@/components/welcome-footer';
import { WelcomeHero } from '@/components/welcome-hero';
import { WelcomeHowItWorks } from '@/components/welcome-how-it-works';
import { WelcomeNavbar } from '@/components/welcome-navbar';
import { WelcomePricing } from '@/components/welcome-pricing';
import { WelcomeSystemDemo } from '@/components/welcome-system-demo';
import { WelcomeTestimonials } from '@/components/welcome-testimonials';

export function Welcome() {
  return (
    <div className="min-h-screen bg-[#0F0F17] text-[#EAEAEA]">
      <WelcomeNavbar />
      <WelcomeHero />
      <WelcomeHowItWorks />
      <WelcomeBenefits />
      <WelcomeSystemDemo />
      <WelcomeTestimonials />
      <WelcomePricing />
      <WelcomeFooter />
    </div>
  );
}
