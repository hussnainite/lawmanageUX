"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Car, DollarSign, Building, CreditCard, Landmark } from "lucide-react"

export default function PropertyFinancialTab() {
  // Sample data for assets and liabilities
  const [realEstate, setRealEstate] = useState([
    {
      id: 1,
      name: "Family Home",
      description: "Joint ownership",
      value: 750000,
    },
  ])

  const [otherAssets, setOtherAssets] = useState([
    {
      id: 1,
      name: "2020 SUV",
      description: "Vehicle • Owned by husband",
      value: 35000,
      icon: "car",
    },
    {
      id: 2,
      name: "Joint Savings",
      description: "Bank Account • To be divided equally",
      value: 125000,
      icon: "dollar",
    },
    {
      id: 3,
      name: "Super Account",
      description: "Super • Husband's retirement account",
      value: 250000,
      icon: "dollar",
    },
  ])

  const [liabilities, setLiabilities] = useState([
    {
      id: 1,
      name: "Family Home",
      description: "Mortgage • Joint liability",
      value: 350000,
      icon: "dollar",
    },
    {
      id: 2,
      name: "Credit Card Debt",
      description: "Credit Card • Husband's liability",
      value: 15000,
      icon: "credit-card",
    },
  ])

  // Calculate totals
  const totalAssets =
    realEstate.reduce((sum, item) => sum + item.value, 0) + otherAssets.reduce((sum, item) => sum + item.value, 0)
  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.value, 0)
  const netWorth = totalAssets - totalLiabilities

  // Function to render the appropriate icon
  const renderIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-6 w-6 text-gray-500" />
      case "car":
        return <Car className="h-6 w-6 text-gray-500" />
      case "dollar":
        return <DollarSign className="h-6 w-6 text-gray-500" />
      case "building":
        return <Building className="h-6 w-6 text-gray-500" />
      case "credit-card":
        return <CreditCard className="h-6 w-6 text-gray-500" />
      case "bank":
        return <Landmark className="h-6 w-6 text-gray-500" />
      default:
        return <DollarSign className="h-6 w-6 text-gray-500" />
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Real Estate Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Real Estate</h3>
            <Button variant="outline" className="flex items-center gap-2">
              <span className="text-lg">+</span> Add Property
            </Button>
          </div>

          {realEstate.map((property) => (
            <Card key={property.id} className="mb-3">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <Home className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{property.name}</h4>
                    <p className="text-gray-500">{property.description}</p>
                  </div>
                </div>
                <div className="text-xl font-bold">{formatCurrency(property.value)}</div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Other Assets Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Other Assets</h3>
            <Button variant="outline" className="flex items-center gap-2">
              <span className="text-lg">+</span> Add Asset
            </Button>
          </div>

          {otherAssets.map((asset) => (
            <Card key={asset.id} className="mb-3">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded-md">{renderIcon(asset.icon)}</div>
                  <div>
                    <h4 className="font-semibold text-lg">{asset.name}</h4>
                    <p className="text-gray-500">{asset.description}</p>
                  </div>
                </div>
                <div className="text-xl font-bold">{formatCurrency(asset.value)}</div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Liabilities Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Liabilities</h3>
            <Button variant="outline" className="flex items-center gap-2">
              <span className="text-lg">+</span> Add Liability
            </Button>
          </div>

          {liabilities.map((liability) => (
            <Card key={liability.id} className="mb-3">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded-md">{renderIcon(liability.icon)}</div>
                  <div>
                    <h4 className="font-semibold text-lg">{liability.name}</h4>
                    <p className="text-gray-500">{liability.description}</p>
                  </div>
                </div>
                <div className="text-xl font-bold">{formatCurrency(liability.value)}</div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Financial Summary Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-4">Financial Summary</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-lg">Total Assets:</span>
              <span className="text-xl font-bold">{formatCurrency(totalAssets)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-lg">Total Liabilities:</span>
              <span className="text-xl font-bold">{formatCurrency(totalLiabilities)}</span>
            </div>

            <div className="border-t pt-4 mt-2 flex justify-between items-center">
              <span className="text-lg font-medium">Net Worth:</span>
              <span className="text-xl font-bold">{formatCurrency(netWorth)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
