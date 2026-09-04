import { useEffect } from 'react'
import { Route, Switch, Router, useLocation } from 'wouter'
import Seo from './components/Seo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileActionBar from './components/MobileActionBar'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useParallax } from './hooks/useParallax'
import Home from './pages/Home'
import About from './pages/About'
import Impact from './pages/Impact'
import GolfTournament from './pages/GolfTournament'
import AviationEvents from './pages/AviationEvents'
import FlightCrew from './pages/FlightCrew'
import Donate from './pages/Donate'
import Contact from './pages/Contact'
import ApplyForAid from './pages/ApplyForAid'
import FlightScholarship from './pages/FlightScholarship'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Accessibility from './pages/Accessibility'
import Raffle from './pages/Raffle'
import RaffleManage from './pages/RaffleManage'
import RaffleLive from './pages/RaffleLive'
import NotFound from './pages/NotFound'
import CookieBanner from './components/CookieBanner'
import GolfPopup from './components/GolfPopup'

function Shell() {
  const [location] = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useScrollReveal(location)
  useParallax(location)

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg focus:text-gray-900">Skip to content</a>
      <Seo path={location} />
      <Navbar />
      <main id="main-content">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/impact" component={Impact} />
          <Route path="/golf-tournament" component={GolfTournament} />
          <Route path="/aviation-events" component={AviationEvents} />
          <Route path="/flight-crew" component={FlightCrew} />
          <Route path="/donate" component={Donate} />
          <Route path="/apply-for-aid" component={ApplyForAid} />
          <Route path="/flight-scholarship" component={FlightScholarship} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/accessibility" component={Accessibility} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <MobileActionBar />
      <CookieBanner />
      <GolfPopup />
    </>
  )
}

export default function App({ ssrPath }: { readonly ssrPath?: string }) {
  return (
    <Router ssrPath={ssrPath}>
      <Switch>
        {/* Standalone 50/50 event tools: no site chrome, reached by QR / direct link. */}
        <Route path="/5050" component={Raffle} />
        <Route path="/5050/manage" component={RaffleManage} />
        <Route path="/5050/live" component={RaffleLive} />
        <Route><Shell /></Route>
      </Switch>
    </Router>
  )
}
