import { config } from "../../config/config";
import LandingPageInfoCard from "../components/LandingPageInfoCard";
import TopNavigationBar from "../components/TopNavigationBar";

export default function LandingPage() {
  return (
    <div className="app-container">
      <title>{config.appTitle}</title>
      <TopNavigationBar />

      <main className="flex-grow overflow-y-auto custom-scrollbar">
        <section className="mx-auto max-w-7xl space-y-24 px-4 py-24">
          <h1 className="text-4xl font-extralight pl-2">
            Craft value-packed content truly authentic to your brand
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <LandingPageInfoCard
              step={1}
              text="Describe your brand's mission, voice, and target audience in detail."
            />
            <LandingPageInfoCard
              step={2}
              text="Provide your best content assets: social media posts, video scripts, articles, and educational resources."
            />
            <LandingPageInfoCard
              step={3}
              text="Let's build something true to you. Start creating!"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
