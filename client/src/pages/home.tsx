import Header from "@/components/header";
import Hero from "@/components/hero";
import ProgressDashboard from "@/components/progress-dashboard";
import WhyLearn from "@/components/why-learn";
import CourseOverview from "@/components/course-overview";
import LearningMethods from "@/components/learning-methods";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <ProgressDashboard />
      <WhyLearn />
      <CourseOverview />
      <LearningMethods />
      <Pricing />
      <Footer />
    </div>
  );
}
