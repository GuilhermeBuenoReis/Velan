import { WelcomeBenefits } from '@/pages/welcome/components/welcome-benefits';
import { WelcomeFooter } from '@/pages/welcome/components/welcome-footer';
import { WelcomeHero } from '@/pages/welcome/components/welcome-hero';
import { WelcomeHowItWorks } from '@/pages/welcome/components/welcome-how-it-works';
import { WelcomeNavbar } from '@/pages/welcome/components/welcome-navbar';
import { WelcomePricing } from '@/pages/welcome/components/welcome-pricing';
import { WelcomeSystemDemo } from '@/pages/welcome/components/welcome-system-demo';
import { WelcomeTestimonials } from '@/pages/welcome/components/welcome-testimonials';

export function Welcome() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-foreground">
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
