// ============================================
// Root App
// ============================================

function App() {
  return (
    <React.Fragment>
      <Header />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Performance />
      <TradesTable />
      <CompoundCalculator />
      <TestimonialsSection />
      <FinalCTA />
      <SiteFooter />
      <WhatsAppButton />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
