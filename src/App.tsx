import { memo } from "react";

import { Header } from "./features/ticket/components/Header";
import { TicketTabs } from "./features/ticket/components/ticket-tabs";
import { TicketDetails } from "./features/ticket/components/TicketDetails";

const App = memo(function App() {
  return (
    <div className="flex h-screen w-screen flex-row-reverse overflow-x-hidden bg-slate-100">
      {/* Left container: Header + Tabs + Ticket details with full height */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        {/* Top header */}
        <Header />

        <TicketTabs />

        {/* Ticket details (includes its own left sidebar) */}
        <main className="flex min-h-0 min-w-0 flex-1">
          <TicketDetails className="h-full w-full" />
        </main>
      </div>
    </div>
  );
});

export default App;
