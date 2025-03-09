
import React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface CurrencySelectorProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencies: Currency[];
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  setCurrency,
  currencies
}) => {
  // If no currencies provided, use defaults
  const availableCurrencies = currencies.length > 0 ? currencies : [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <span>{currency.symbol}</span>
          <span className="hidden sm:inline-block">{currency.code}</span>
          <ChevronsUpDown className="h-3.5 w-3.5 ml-1 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {availableCurrencies.map((curr) => (
          <DropdownMenuItem 
            key={curr.code}
            onClick={() => setCurrency(curr)}
            className="cursor-pointer"
          >
            <span className="font-medium mr-2">{curr.symbol}</span>
            <span>{curr.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
