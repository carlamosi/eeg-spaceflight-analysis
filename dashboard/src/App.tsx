import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import ProtocolSection from './components/ProtocolSection';
import DataSection from './components/DataSection';
import EarlyDetectionSection from './components/EarlyDetectionSection';
import MLSection from './components/MLSection';
import MethodologySection from './components/MethodologySection';

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <ProtocolSection />
      <DataSection />
      <EarlyDetectionSection />
      <MLSection />
      <MethodologySection />
    </Layout>
  );
}
