import { Card } from "./components/Card";
import { TopBar } from "./components/TopBar";
import { MdAccountBalanceWallet, MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from "react-icons/md";

export default function Home() {
  return (
    <div className="w-full">
      <TopBar />

      <main className="px-4 py-4 bg-gray-900 h-screen">
            <section className="grid grid-cols-4">
                <Card 
                    icon={{
                        icon: MdAccountBalanceWallet,
                        color: 'bg-green-200'
                    }}
                    percentage="12.5%"
                    balance="50.000.00"
                    cardName="Total Balance"
                    cardBgColor="bg-green-400"
                />
            </section>
      </main>
    </div>
  );
}
