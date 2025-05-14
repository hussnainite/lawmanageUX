"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Plus, Calendar } from "lucide-react"

export default function PropertyFinancialTab() {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Remove currency formatting for input fields
  const formatCurrencyInput = (amount: number) => {
    return amount.toFixed(2)
  }

  return (
    <Tabs defaultValue="real-estate" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
        <TabsTrigger value="other-assets">Other Assets</TabsTrigger>
        <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
        <TabsTrigger value="superannuation">Superannuation</TabsTrigger>
      </TabsList>

      {/* Real Estate Tab */}
      <TabsContent value="real-estate" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Real Estate Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="property-details">
              <TabsList>
                <TabsTrigger value="property-details">Property Details</TabsTrigger>
                <TabsTrigger value="mortgage-details">Mortgage Details</TabsTrigger>
              </TabsList>

              <TabsContent value="property-details" className="mt-4">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Property Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="building-level">Building/Level</Label>
                      <Input id="building-level" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <div className="flex gap-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unit">Unit</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input className="w-24" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street-number">Street</Label>
                      <Input id="street-number" className="w-full" placeholder="Number" />
                    </div>

                    <div className="space-y-2 md:pt-8">
                      <Input className="w-full" placeholder="Street Name" />
                    </div>

                    <div className="space-y-2 md:pt-8">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Street Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="street">Street</SelectItem>
                          <SelectItem value="road">Road</SelectItem>
                          <SelectItem value="avenue">Avenue</SelectItem>
                          <SelectItem value="drive">Drive</SelectItem>
                          <SelectItem value="court">Court</SelectItem>
                          <SelectItem value="place">Place</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="suburb">Suburb</Label>
                      <div className="flex gap-2">
                        <Input id="suburb" />
                        <Select>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nsw">NSW</SelectItem>
                            <SelectItem value="vic">VIC</SelectItem>
                            <SelectItem value="qld">QLD</SelectItem>
                            <SelectItem value="sa">SA</SelectItem>
                            <SelectItem value="wa">WA</SelectItem>
                            <SelectItem value="tas">TAS</SelectItem>
                            <SelectItem value="act">ACT</SelectItem>
                            <SelectItem value="nt">NT</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input className="w-24" placeholder="Postcode" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title-reference">Title Reference</Label>
                    <Input id="title-reference" />
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox id="former-matrimonial-home" />
                    <Label htmlFor="former-matrimonial-home">Former Matrimonial Home</Label>
                  </div>

                  <div className="space-y-4 mt-4">
                    <h3 className="font-medium">Ownership & Value</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tenancy">Tenancy</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="joint">Joint Tenants</SelectItem>
                            <SelectItem value="tenants-in-common">Tenants in Common</SelectItem>
                            <SelectItem value="sole">Sole Owner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clients-share">Client's Share</Label>
                        <div className="flex items-center gap-2">
                          <Input id="clients-share" className="w-24" />
                          <span>%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="value-of-share">Value of Share</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input id="value-of-share" defaultValue="0.00" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="total-value">Total Value</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input id="total-value" defaultValue="0.00" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mortgage-details" className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Mortgage 1</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name-of-lender-1">Name of Lender</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commonwealth">Commonwealth Bank</SelectItem>
                            <SelectItem value="westpac">Westpac</SelectItem>
                            <SelectItem value="nab">NAB</SelectItem>
                            <SelectItem value="anz">ANZ</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clients-share-1">Client's Share</Label>
                        <div className="flex items-center gap-2">
                          <Input id="clients-share-1" className="w-24" />
                          <span>%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount-of-share-1">Amount of Share</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input id="amount-of-share-1" defaultValue="0.00" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="total-amount-1">Total Amount</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input id="total-amount-1" defaultValue="0.00" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Mortgage 2</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name-of-lender-2">Name of Lender</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commonwealth">Commonwealth Bank</SelectItem>
                            <SelectItem value="westpac">Westpac</SelectItem>
                            <SelectItem value="nab">NAB</SelectItem>
                            <SelectItem value="anz">ANZ</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clients-share-2">Client's Share</Label>
                        <div className="flex items-center gap-2">
                          <Input id="clients-share-2" className="w-24" />
                          <span>%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount-of-share-2">Amount of Share</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input id="amount-of-share-2" defaultValue="0.00" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="total-amount-2">Total Amount</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input id="total-amount-2" defaultValue="0.00" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Other Assets Tab */}
      <TabsContent value="other-assets" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Other Asset Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cars-household">
              <TabsList className="w-full">
                <TabsTrigger value="cars-household">Cars & Household Contents</TabsTrigger>
                <TabsTrigger value="bank-accounts">Bank Accounts & Businesses</TabsTrigger>
                <TabsTrigger value="investments">Investments & Other</TabsTrigger>
                <TabsTrigger value="financial-resources">Financial Resources & Addbacks</TabsTrigger>
              </TabsList>

              <TabsContent value="cars-household" className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Motor Vehicles</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Make</th>
                            <th className="text-left py-2 pr-4">Model</th>
                            <th className="text-left py-2 pr-4">Year</th>
                            <th className="text-left py-2 pr-4">Registration No.</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="toyota">Toyota</SelectItem>
                                    <SelectItem value="honda">Honda</SelectItem>
                                    <SelectItem value="ford">Ford</SelectItem>
                                    <SelectItem value="mazda">Mazda</SelectItem>
                                    <SelectItem value="hyundai">Hyundai</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2022">2022</SelectItem>
                                    <SelectItem value="2021">2021</SelectItem>
                                    <SelectItem value="2020">2020</SelectItem>
                                    <SelectItem value="2019">2019</SelectItem>
                                    <SelectItem value="2018">2018</SelectItem>
                                    <SelectItem value="older">Older</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Motor Vehicle
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Household Contents</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <Label htmlFor="household-description">Description</Label>
                        <textarea
                          id="household-description"
                          className="w-full h-24 mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="household-client-share">Client's Share</Label>
                          <div className="flex items-center gap-2">
                            <Input id="household-client-share" className="w-24" />
                            <span>%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="household-value-share">Value of Share</Label>
                          <div className="flex items-center gap-2">
                            <span>$</span>
                            <Input id="household-value-share" defaultValue="0.00" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="household-total-value">Total Value</Label>
                          <div className="flex items-center gap-2">
                            <span>$</span>
                            <Input id="household-total-value" defaultValue="0.00" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bank-accounts" className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Bank Accounts</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Institution</th>
                            <th className="text-left py-2 pr-4">Account No.</th>
                            <th className="text-left py-2 pr-4">BSB</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="commonwealth">Commonwealth</SelectItem>
                                    <SelectItem value="westpac">Westpac</SelectItem>
                                    <SelectItem value="nab">NAB</SelectItem>
                                    <SelectItem value="anz">ANZ</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Bank Account
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Businesses</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Name</th>
                            <th className="text-left py-2 pr-4">Type</th>
                            <th className="text-left py-2 pr-4">Address</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="sole-trader">Sole Trader</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                    <SelectItem value="company">Company</SelectItem>
                                    <SelectItem value="trust">Trust</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Business
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="investments" className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Investments</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Name</th>
                            <th className="text-left py-2 pr-4">Type</th>
                            <th className="text-left py-2 pr-4">Number of Shares</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Investment
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Life Insurance</h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="insurance-company">Name of Company</Label>
                        <Input id="insurance-company" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="policy-type">Policy Type</Label>
                        <Input id="policy-type" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="policy-number">Policy No.</Label>
                        <Input id="policy-number" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="surrender-value">Surrender Value</Label>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input id="surrender-value" defaultValue="0.00" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Other Personal Property</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Description</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Other Personal Property
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial-resources" className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Financial Resources</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Description</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Financial Resource
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Addbacks</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Description</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Addback
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Liabilities Tab */}
      <TabsContent value="liabilities" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Liability Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="credit-cards-loans">
              <TabsList className="w-full">
                <TabsTrigger value="credit-cards-loans">Credit Cards & Loans</TabsTrigger>
                <TabsTrigger value="hire-purchase">Hire Purchase, Leases & Unpaid Tax</TabsTrigger>
                <TabsTrigger value="other-liabilities">Other Personal & Business Liabilities</TabsTrigger>
              </TabsList>

              <TabsContent value="credit-cards-loans" className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Credit/Charge Cards</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Card Provider</th>
                            <th className="text-left py-2 pr-4">Type of Card</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="visa">Visa</SelectItem>
                                    <SelectItem value="mastercard">Mastercard</SelectItem>
                                    <SelectItem value="amex">American Express</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Credit Card
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Loans</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Name of Lender</th>
                            <th className="text-left py-2 pr-4">Type of Loan</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="commonwealth">Commonwealth Bank</SelectItem>
                                    <SelectItem value="westpac">Westpac</SelectItem>
                                    <SelectItem value="nab">NAB</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 pr-4">
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="car">Car</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Loan
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hire-purchase" className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Hire Purchase/Leases</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Name of Lender</th>
                            <th className="text-left py-2 pr-4">Description of Property</th>
                            <th className="text-left py-2 pr-4">Final Payment</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <Button variant="outline" size="sm">
                                  <Calendar className="h-4 w-4 mr-1" /> Select a date
                                </Button>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Hire Purchase/Lease
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Unpaid Tax</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Total Tax Unpaid for Last Financial Year</Label>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="last-year-client-share">Client's Share</Label>
                          <div className="flex items-center gap-1">
                            <Input id="last-year-client-share" className="w-16" />
                            <span>%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor="last-year-value-share">Value of Share</Label>
                          <div className="flex items-center gap-1">
                            <span>$</span>
                            <Input id="last-year-value-share" defaultValue="0.00" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="last-year-total">Total Amount</Label>
                          <div className="flex items-center gap-1">
                            <span>$</span>
                            <Input id="last-year-total" defaultValue="0.00" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Total Tax Unpaid for Previous Financial Years</Label>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="previous-years-client-share">Client's Share</Label>
                          <div className="flex items-center gap-1">
                            <Input id="previous-years-client-share" className="w-16" />
                            <span>%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor="previous-years-value-share">Value of Share</Label>
                          <div className="flex items-center gap-1">
                            <span>$</span>
                            <Input id="previous-years-value-share" defaultValue="0.00" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="previous-years-total">Total Amount</Label>
                          <div className="flex items-center gap-1">
                            <span>$</span>
                            <Input id="previous-years-total" defaultValue="0.00" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="other-liabilities" className="mt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Other Personal Liabilities</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Description</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Personal Liability
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Other Business Liabilities</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Description</th>
                            <th className="text-left py-2 pr-4">Client's Share</th>
                            <th className="text-left py-2 pr-4">Value of Share</th>
                            <th className="text-left py-2 pr-4">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="border-b">
                              <td className="py-2 pr-4">
                                <Input />
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <Input className="w-16" />
                                  <span>%</span>
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                              <td className="py-2 pr-4">
                                <div className="flex items-center gap-1">
                                  <span>$</span>
                                  <Input defaultValue="0.00" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Business Liability
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Superannuation Tab */}
      <TabsContent value="superannuation" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Superannuation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">Superannuation Funds</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-1" /> Add Superannuation Fund
                </Button>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="super-fund-name">Fund Name</Label>
                          <Input id="super-fund-name" defaultValue="AustralianSuper" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="super-member-number">Member Number</Label>
                          <Input id="super-member-number" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="super-join-date">Date Joined</Label>
                          <Button variant="outline" id="super-join-date">
                            <Calendar className="h-4 w-4 mr-1" /> Select a date
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="super-client-share">Client's Share</Label>
                          <div className="flex items-center gap-2">
                            <Input id="super-client-share" className="w-24" defaultValue="100" />
                            <span>%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="super-value">Current Value</Label>
                          <div className="flex items-center gap-2">
                            <span>$</span>
                            <Input id="super-value" defaultValue="250000.00" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
