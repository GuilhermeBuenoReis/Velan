import { WelcomeBenefits } from '@/components/common/welcome/welcome-benefits';
import { WelcomeFooter } from '@/components/common/welcome/welcome-footer';
import { WelcomeHero } from '@/components/common/welcome/welcome-hero';
import { WelcomeHowItWorks } from '@/components/common/welcome/welcome-how-it-works';
import { WelcomeNavbar } from '@/components/common/welcome/welcome-navbar';
import { WelcomePricing } from '@/components/common/welcome/welcome-pricing';
import { WelcomeSystemDemo } from '@/components/common/welcome/welcome-system-demo';
import { WelcomeTestimonials } from '@/components/common/welcome/welcome-testimonials';

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
