import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WifiPage from "./pages/WifiPage";
import ContactoPage from "./pages/ContactoPage";
import HorariosPage from "./pages/HorariosPage";
import MinibarPage from "./pages/MinibarPage";
import SostenibilidadPage from "./pages/SostenibilidadPage";
import ServicioHabitacionesPage from "./pages/ServicioHabitacionesPage";
import DesayunoPage from "./pages/DesayunoPage";
import RestaurantePage from "./pages/RestaurantePage";
import BarPage from "./pages/BarPage";
import HistoriaPage from "./pages/HistoriaPage";
import ViajerosPage from "./pages/ViajerosPage";
import CampanadasPage from "./pages/CampanadasPage";
import PostalPage from "./pages/PostalPage";
import Top10Page from "./pages/Top10Page";
import TransportePage from "./pages/TransportePage";
import ServiceDetail from "./pages/ServiceDetail";
import ServiciosPage from "./pages/ServiciosPage";
import ClimatiPage from "./pages/ClimatiPage";

function BackWrapper({ children }: { children: (onBack: () => void) => React.ReactNode }) {
  const [, setLocation] = useLocation();
  const onBack = () => setLocation("/");
  return <>{children(onBack)}</>;
}

function Router() {
  const [, setLocation] = useLocation();

  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />

        <Route path="/wifi">
          <BackWrapper>{(onBack) => <WifiPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/contacto">
          <BackWrapper>{(onBack) => <ContactoPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/horarios">
          <BackWrapper>{(onBack) => <HorariosPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/minibar">
          <BackWrapper>{(onBack) => <MinibarPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/sostenibilidad">
          <BackWrapper>{(onBack) => <SostenibilidadPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/servicios">
          <BackWrapper>
            {(onBack) => (
              <ServiciosPage
                onBack={onBack}
                onContacto={() => setLocation("/contacto")}
                onClimati={() => setLocation("/climati")}
              />
            )}
          </BackWrapper>
        </Route>
        <Route path="/climati">
          <BackWrapper>
            {(onBack) => <ClimatiPage onBack={onBack} onContacto={() => setLocation("/contacto")} />}
          </BackWrapper>
        </Route>
        <Route path="/servicio">
          <BackWrapper>
            {(onBack) => (
              <ServicioHabitacionesPage
                onBack={onBack}
                onContacto={() => setLocation("/contacto")}
              />
            )}
          </BackWrapper>
        </Route>
        <Route path="/desayuno">
          <BackWrapper>{(onBack) => <DesayunoPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/restaurante">
          <BackWrapper>{(onBack) => <RestaurantePage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/bar">
          <BackWrapper>{(onBack) => <BarPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/historia">
          <BackWrapper>
            {(onBack) => (
              <HistoriaPage
                onBack={onBack}
                onViajeros={() => setLocation("/viajeros")}
                onCampanadas={() => setLocation("/campanadas")}
              />
            )}
          </BackWrapper>
        </Route>
        <Route path="/viajeros">
          <BackWrapper>{(onBack) => <ViajerosPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/campanadas">
          <BackWrapper>{(onBack) => <CampanadasPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/postal">
          <BackWrapper>{(onBack) => <PostalPage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/top10">
          <BackWrapper>{(onBack) => <Top10Page onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/transporte">
          <BackWrapper>{(onBack) => <TransportePage onBack={onBack} />}</BackWrapper>
        </Route>
        <Route path="/experiencias/:key">
          {(params) => (
            <BackWrapper>
              {(onBack) => <ServiceDetail serviceKey={params.key} onBack={onBack} />}
            </BackWrapper>
          )}
        </Route>

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function ToasterWithTheme() {
  const { theme } = useTheme();
  return <Toaster theme={theme} />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <ToasterWithTheme />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
