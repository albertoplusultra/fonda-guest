import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WifiPage = lazy(() => import("./pages/WifiPage"));
const ContactoPage = lazy(() => import("./pages/ContactoPage"));
const HorariosPage = lazy(() => import("./pages/HorariosPage"));
const MinibarPage = lazy(() => import("./pages/MinibarPage"));
const SostenibilidadPage = lazy(() => import("./pages/SostenibilidadPage"));
const ServicioHabitacionesPage = lazy(() => import("./pages/ServicioHabitacionesPage"));
const DesayunoPage = lazy(() => import("./pages/DesayunoPage"));
const RestaurantePage = lazy(() => import("./pages/RestaurantePage"));
const BarPage = lazy(() => import("./pages/BarPage"));
const HistoriaPage = lazy(() => import("./pages/HistoriaPage"));
const ViajerosPage = lazy(() => import("./pages/ViajerosPage"));
const CampanadasPage = lazy(() => import("./pages/CampanadasPage"));
const PostalPage = lazy(() => import("./pages/PostalPage"));
const Top10Page = lazy(() => import("./pages/Top10Page"));
const TransportePage = lazy(() => import("./pages/TransportePage"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const ServiciosPage = lazy(() => import("./pages/ServiciosPage"));
const ClimatiPage = lazy(() => import("./pages/ClimatiPage"));

const PageFallback = () => (
  <div style={{ background: "oklch(0.08 0 0)", minHeight: "100dvh" }} />
);

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
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
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
