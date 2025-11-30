import { memo } from "react";
import "./App.css";

import { Header } from "./features/ticket/components/Header";
import { TicketTabs } from "./features/ticket/components/ticket-tabs";
import { TicketDetails } from "./features/ticket/components/TicketDetails";
import { RightSideBar } from "./features/ticket/components/right-side-bar";

const App = memo(function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-x-hidden bg-slate-100">
      {/* Top header */}
      <Header />

      {/* Tabs bar under header */}
      <TicketTabs />

      {/* Main content area: ticket details + right sidebar */}
      <div className="flex min-h-0 flex-1 flex-row-reverse gap-0">
        {/* Right side: navigation + طلبات list */}
        <RightSideBar className="border-l border-slate-200" />

        {/* Center: Ticket details (includes its own left sidebar) */}
        <main className="flex min-w-0 flex-1 items-stretch justify-stretch">
          <TicketDetails className="h-full w-full" />
        </main>
      </div>
    </div>
  );
});

export default App;
