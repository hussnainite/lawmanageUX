"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Save, Check } from "lucide-react"

export default function IntakeFormPage({ params }: { params: { slug: string } }) {
  // This would come from your database based on the slug
  const formTitle = params.slug === "family-law-intake" ? "Family Law Intake Form" : "Client Intake Form"

  return (
    <div className="py-8">
      <div className="container max-w-3xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{formTitle}</CardTitle>
            <CardDescription>
              Please complete this form to provide us with information about your family law matter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IntakeFormContent params={params} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function IntakeFormContent({ params }: { params: { slug: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const steps = [
    { id: "introduction", title: "Introduction" },
    { id: "otherside", title: "Other Party Details" },
    { id: "lawyer", title: "Lawyer Information", conditional: { field: "other-lawyer", value: "Yes" } },
    { id: "relationship", title: "Relationship Details" },
    { id: "marriage", title: "Marriage" },
    { id: "separation", title: "Separation", conditional: { field: "married", value: "Yes" } },
    { id: "divorce", title: "Divorce", conditional: { field: "separated", value: "Yes" } },
    { id: "living", title: "Current Living Arrangement" },
    { id: "children", title: "Children", conditional: { field: "has-children", value: "Yes" } },
    { id: "financial", title: "Financial & Property" },
    { id: "court", title: "Court Proceedings" },
    { id: "mediation", title: "Mediation", conditional: { field: "undertaken-mediation", value: "Yes" } },
    { id: "court2", title: "Court Proceedings Details" },
    { id: "violence", title: "Family Violence" },
    { id: "health", title: "Health Information" },
    { id: "health-other", title: "Other Party Health" },
    { id: "legal-advice", title: "Previous Legal Advice" },
    { id: "priorities", title: "Your Priorities" },
    { id: "final", title: "Final Questions" },
  ]

  // Filter steps based on conditional logic
  const visibleSteps = steps.filter((step) => {
    if (!step.conditional) return true
    return formData[step.conditional.field] === step.conditional.value
  })

  const totalSteps = visibleSteps.length

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      setIsSubmitted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSaveProgress = () => {
    // In a real application, this would save to a database or localStorage
    localStorage.setItem(`intake-form-${params.slug}`, JSON.stringify(formData))
    alert("Your progress has been saved. You can return to complete the form later.")
  }

  const handleSubmit = () => {
    // In a real application, this would submit the form data to a server
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  // Load saved progress
  useEffect(() => {
    const savedData = localStorage.getItem(`intake-form-${params.slug}`)
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Error loading saved form data:", e)
      }
    }
  }, [params.slug])

  const currentStepData = visibleSteps[currentStep]

  if (isSubmitted) {
    return (
      <div className="text-center py-10">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-800 rounded-full p-4">
            <Check className="h-12 w-12" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="mb-6">Your intake form has been submitted successfully.</p>
        <p className="mb-6">One of our team members will contact you shortly.</p>
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
          </span>
        </div>
        <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
      </div>

      {/* Step title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">{currentStepData.title}</h2>
        <div className="h-1 w-20 bg-primary mt-2"></div>
      </div>

      {/* Step navigation - mobile friendly dots */}
      <div className="flex justify-center mb-6 overflow-x-auto py-2 hide-scrollbar">
        <div className="flex space-x-2">
          {visibleSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep ? "bg-primary" : "bg-gray-200"
              }`}
              aria-label={`Go to step ${index + 1}: ${step.title}`}
            />
          ))}
        </div>
      </div>

      <Tabs value={visibleSteps[currentStep].id} className="mt-6">
        <TabsContent value="introduction" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Your Full Name</Label>
              <Input
                id="full-name"
                value={formData["full-name"] || ""}
                onChange={(e) => handleInputChange("full-name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Your Address</Label>
              <Input
                id="address"
                value={formData["address"] || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData["email"] || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData["phone"] || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">What is your DOB?</Label>
              <Input
                id="dob"
                type="date"
                value={formData["dob"] || ""}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth-country">Country of Birth?</Label>
              <Input
                id="birth-country"
                value={formData["birth-country"] || ""}
                onChange={(e) => handleInputChange("birth-country", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Are you aboriginal and or/ of Torres Strait Islander origin?</Label>
              <RadioGroup
                value={formData["indigenous"] || ""}
                onValueChange={(value) => handleInputChange("indigenous", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="indigenous-no" />
                  <Label htmlFor="indigenous-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Aboriginal" id="indigenous-aboriginal" />
                  <Label htmlFor="indigenous-aboriginal">Yes - Aboriginal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Torres Strait Islander" id="indigenous-tsi" />
                  <Label htmlFor="indigenous-tsi">Yes - Torres Strait Islander</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Aboriginal and Torres Strait Islander" id="indigenous-both" />
                  <Label htmlFor="indigenous-both">Yes - Aboriginal and Torres Strait Islander</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">What is your occupation?</Label>
              <Input
                id="occupation"
                value={formData["occupation"] || ""}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                required
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="otherside" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="other-name">What is other Party's full name?</Label>
              <Input
                id="other-name"
                value={formData["other-name"] || ""}
                onChange={(e) => handleInputChange("other-name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="other-address">What is their current Address?</Label>
              <Input
                id="other-address"
                value={formData["other-address"] || ""}
                onChange={(e) => handleInputChange("other-address", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="other-email">Their Email Address?</Label>
              <Input
                id="other-email"
                type="email"
                value={formData["other-email"] || ""}
                onChange={(e) => handleInputChange("other-email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="other-dob">Their Date of Birth?</Label>
              <Input
                id="other-dob"
                type="date"
                value={formData["other-dob"] || ""}
                onChange={(e) => handleInputChange("other-dob", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Are they aboriginal and or/ of Torres Strait Islander origin?</Label>
              <RadioGroup
                value={formData["other-indigenous"] || ""}
                onValueChange={(value) => handleInputChange("other-indigenous", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="other-indigenous-no" />
                  <Label htmlFor="other-indigenous-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Aboriginal" id="other-indigenous-aboriginal" />
                  <Label htmlFor="other-indigenous-aboriginal">Yes - Aboriginal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Torres Strait Islander" id="other-indigenous-tsi" />
                  <Label htmlFor="other-indigenous-tsi">Yes - Torres Strait Islander</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Aboriginal and Torres Strait Islander" id="other-indigenous-both" />
                  <Label htmlFor="other-indigenous-both">Yes - Aboriginal and Torres Strait Islander</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="other-occupation">Their Occupation?</Label>
              <Input
                id="other-occupation"
                value={formData["other-occupation"] || ""}
                onChange={(e) => handleInputChange("other-occupation", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Do they have a lawyer?</Label>
              <RadioGroup
                value={formData["other-lawyer"] || ""}
                onValueChange={(value) => handleInputChange("other-lawyer", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="other-lawyer-yes" />
                  <Label htmlFor="other-lawyer-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="other-lawyer-no" />
                  <Label htmlFor="other-lawyer-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Unknown" id="other-lawyer-unknown" />
                  <Label htmlFor="other-lawyer-unknown">Unknown</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lawyer" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lawyer-name">What is the lawyer's name?</Label>
              <Input
                id="lawyer-name"
                value={formData["lawyer-name"] || ""}
                onChange={(e) => handleInputChange("lawyer-name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firm-name">Name of the firm?</Label>
              <Input
                id="firm-name"
                value={formData["firm-name"] || ""}
                onChange={(e) => handleInputChange("firm-name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Have you received paperwork or letter from the lawyer?</Label>
              <RadioGroup
                value={formData["received-paperwork"] || ""}
                onValueChange={(value) => handleInputChange("received-paperwork", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="paperwork-yes" />
                  <Label htmlFor="paperwork-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="paperwork-no" />
                  <Label htmlFor="paperwork-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["received-paperwork"] === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="paperwork-summary">In summary what does the letter/paperwork say?</Label>
                <Textarea
                  id="paperwork-summary"
                  value={formData["paperwork-summary"] || ""}
                  onChange={(e) => handleInputChange("paperwork-summary", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="relationship" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Have you ever resided together?</Label>
              <RadioGroup
                value={formData["resided-together"] || ""}
                onValueChange={(value) => handleInputChange("resided-together", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="resided-yes" />
                  <Label htmlFor="resided-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="resided-no" />
                  <Label htmlFor="resided-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["resided-together"] === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="cohabitation-date">
                  What date did you commence cohabitation? (i.e. Move in together)
                </Label>
                <Input
                  id="cohabitation-date"
                  type="date"
                  value={formData["cohabitation-date"] || ""}
                  onChange={(e) => handleInputChange("cohabitation-date", e.target.value)}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="marriage" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Are you or were you married to the other party?</Label>
              <RadioGroup
                value={formData["married"] || ""}
                onValueChange={(value) => handleInputChange("married", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="married-yes" />
                  <Label htmlFor="married-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="married-no" />
                  <Label htmlFor="married-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["married"] === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="marriage-date">On what date did you marry?</Label>
                <Input
                  id="marriage-date"
                  type="date"
                  value={formData["marriage-date"] || ""}
                  onChange={(e) => handleInputChange("marriage-date", e.target.value)}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="separation" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Are you currently separated?</Label>
              <RadioGroup
                value={formData["separated"] || ""}
                onValueChange={(value) => handleInputChange("separated", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="separated-yes" />
                  <Label htmlFor="separated-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="separated-no" />
                  <Label htmlFor="separated-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["separated"] === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="separation-date">What date did you separate?</Label>
                <Input
                  id="separation-date"
                  type="date"
                  value={formData["separation-date"] || ""}
                  onChange={(e) => handleInputChange("separation-date", e.target.value)}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="divorce" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Are you divorced?</Label>
              <RadioGroup
                value={formData["divorced"] || ""}
                onValueChange={(value) => handleInputChange("divorced", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="divorced-yes" />
                  <Label htmlFor="divorced-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="divorced-no" />
                  <Label htmlFor="divorced-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["divorced"] === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="divorce-date">What date were you divorced?</Label>
                <Input
                  id="divorce-date"
                  type="date"
                  value={formData["divorce-date"] || ""}
                  onChange={(e) => handleInputChange("divorce-date", e.target.value)}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="living" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What are your current living arrangements?</Label>
              <RadioGroup
                value={formData["living-arrangement"] || ""}
                onValueChange={(value) => handleInputChange("living-arrangement", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Living in same house" id="living-same" />
                  <Label htmlFor="living-same">Living in same house</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Separate houses" id="living-separate" />
                  <Label htmlFor="living-separate">Separate houses</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Are there children of your relationship?</Label>
              <RadioGroup
                value={formData["has-children"] || ""}
                onValueChange={(value) => handleInputChange("has-children", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="children-yes" />
                  <Label htmlFor="children-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="children-no" />
                  <Label htmlFor="children-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="children" className="space-y-4">
          <div className="space-y-4">
            {/* We'll use an array in formData to store multiple children */}
            {!formData["children"] && handleInputChange("children", [{ id: 1 }])}

            {formData["children"] &&
              formData["children"].map((child: any, index: number) => (
                <div key={child.id} className="border p-4 rounded-md space-y-4">
                  <h3 className="font-medium">Child {index + 1}</h3>

                  <div className="space-y-2">
                    <Label htmlFor={`child-name-${index}`}>Full Name</Label>
                    <Input
                      id={`child-name-${index}`}
                      value={child.name || ""}
                      onChange={(e) => {
                        const updatedChildren = [...formData["children"]]
                        updatedChildren[index] = { ...child, name: e.target.value }
                        handleInputChange("children", updatedChildren)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`child-dob-${index}`}>Date of Birth</Label>
                    <Input
                      id={`child-dob-${index}`}
                      type="date"
                      value={child.dob || ""}
                      onChange={(e) => {
                        const updatedChildren = [...formData["children"]]
                        updatedChildren[index] = { ...child, dob: e.target.value }
                        handleInputChange("children", updatedChildren)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`child-living-${index}`}>Who do they primarily live with?</Label>
                    <Select
                      value={child.living || ""}
                      onValueChange={(value) => {
                        const updatedChildren = [...formData["children"]]
                        updatedChildren[index] = { ...child, living: value }
                        handleInputChange("children", updatedChildren)
                      }}
                    >
                      <SelectTrigger id={`child-living-${index}`}>
                        <SelectValue placeholder="Select living arrangement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="With me">With me</SelectItem>
                        <SelectItem value="Other parent">Other parent</SelectItem>
                        <SelectItem value="Shared Care">Shared Care</SelectItem>
                        <SelectItem value="N/A- Still residing under the same roof">
                          N/A- Still residing under the same roof
                        </SelectItem>
                        <SelectItem value="Other">Other (Grandparent, carer, sibling, aunt, uncle etc)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {index > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const updatedChildren = formData["children"].filter((_: any, i: number) => i !== index)
                        handleInputChange("children", updatedChildren)
                      }}
                    >
                      Remove Child
                    </Button>
                  )}
                </div>
              ))}

            <Button
              variant="outline"
              onClick={() => {
                const updatedChildren = [...formData["children"], { id: Date.now() }]
                handleInputChange("children", updatedChildren)
              }}
            >
              Add Another Child
            </Button>

            <div className="space-y-2 pt-4">
              <Label htmlFor="care-arrangements">
                Can you give me a short summary of the current care arrangements?
              </Label>
              <Textarea
                id="care-arrangements"
                value={formData["care-arrangements"] || ""}
                onChange={(e) => handleInputChange("care-arrangements", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Would you like advice regarding child support?</Label>
              <RadioGroup
                value={formData["child-support-advice"] || ""}
                onValueChange={(value) => handleInputChange("child-support-advice", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="child-support-yes" />
                  <Label htmlFor="child-support-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="child-support-no" />
                  <Label htmlFor="child-support-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="existing-orders">
                Please provide details of any orders or parenting plans currently in place for the children
              </Label>
              <Textarea
                id="existing-orders"
                value={formData["existing-orders"] || ""}
                onChange={(e) => handleInputChange("existing-orders", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Would you like advice regarding children's matter?</Label>
              <RadioGroup
                value={formData["children-advice"] || ""}
                onValueChange={(value) => handleInputChange("children-advice", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="children-advice-yes" />
                  <Label htmlFor="children-advice-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="children-advice-no" />
                  <Label htmlFor="children-advice-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Is there or has there been any DOC's/FAC's or child welfare authority involvement?</Label>
              <RadioGroup
                value={formData["welfare-involvement"] || ""}
                onValueChange={(value) => handleInputChange("welfare-involvement", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - currently" id="welfare-current" />
                  <Label htmlFor="welfare-current">Yes - currently</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Historically" id="welfare-historical" />
                  <Label htmlFor="welfare-historical">Yes - Historically</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="welfare-no" />
                  <Label htmlFor="welfare-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-safety-concerns">
                Do you have any concerns for your child/ren's safety or well being when they are with the other
                party/ies? If yes, please provide details.
              </Label>
              <Textarea
                id="child-safety-concerns"
                value={formData["child-safety-concerns"] || ""}
                onChange={(e) => handleInputChange("child-safety-concerns", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Does your family law enquiry relate to property settlement?</Label>
              <RadioGroup
                value={formData["property-settlement"] || ""}
                onValueChange={(value) => handleInputChange("property-settlement", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="property-yes" />
                  <Label htmlFor="property-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="property-no" />
                  <Label htmlFor="property-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["property-settlement"] === "Yes" && (
              <>
                {/* Assets */}
                <div className="space-y-2">
                  <Label>What assets do you have, both jointly and separately?</Label>
                  <p className="text-sm text-muted-foreground">
                    (such as personal, shared, business related etc) e.g 123 short street, small town $150,000, Jointly
                    owned
                  </p>

                  {!formData["assets"] && handleInputChange("assets", [{ id: 1 }])}

                  {formData["assets"] &&
                    formData["assets"].map((asset: any, index: number) => (
                      <div key={asset.id} className="border p-4 rounded-md space-y-4 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor={`asset-description-${index}`}>Asset Description</Label>
                          <Input
                            id={`asset-description-${index}`}
                            value={asset.description || ""}
                            onChange={(e) => {
                              const updatedAssets = [...formData["assets"]]
                              updatedAssets[index] = { ...asset, description: e.target.value }
                              handleInputChange("assets", updatedAssets)
                            }}
                            placeholder="e.g. 123 Short Street, Small Town"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`asset-value-${index}`}>Value</Label>
                          <Input
                            id={`asset-value-${index}`}
                            value={asset.value || ""}
                            onChange={(e) => {
                              const updatedAssets = [...formData["assets"]]
                              updatedAssets[index] = { ...asset, value: e.target.value }
                              handleInputChange("assets", updatedAssets)
                            }}
                            placeholder="e.g. $150,000"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`asset-ownership-${index}`}>Ownership</Label>
                          <Select
                            value={asset.ownership || ""}
                            onValueChange={(value) => {
                              const updatedAssets = [...formData["assets"]]
                              updatedAssets[index] = { ...asset, ownership: value }
                              handleInputChange("assets", updatedAssets)
                            }}
                          >
                            <SelectTrigger id={`asset-ownership-${index}`}>
                              <SelectValue placeholder="Select ownership" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Joint">Jointly owned</SelectItem>
                              <SelectItem value="Mine">Mine</SelectItem>
                              <SelectItem value="Other party">Other party</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {index > 0 && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updatedAssets = formData["assets"].filter((_: any, i: number) => i !== index)
                              handleInputChange("assets", updatedAssets)
                            }}
                          >
                            Remove Asset
                          </Button>
                        )}
                      </div>
                    ))}

                  <Button
                    variant="outline"
                    onClick={() => {
                      const updatedAssets = [...formData["assets"], { id: Date.now() }]
                      handleInputChange("assets", updatedAssets)
                    }}
                    className="mt-2"
                  >
                    Add Another Asset
                  </Button>
                </div>

                {/* Liabilities */}
                <div className="space-y-2 pt-4">
                  <Label>What liabilities do you currently have, both jointly and separately?</Label>
                  <p className="text-sm text-muted-foreground">
                    e.g Mortgage over 123 street, small town $50,000, joint
                  </p>

                  {!formData["liabilities"] && handleInputChange("liabilities", [{ id: 1 }])}

                  {formData["liabilities"] &&
                    formData["liabilities"].map((liability: any, index: number) => (
                      <div key={liability.id} className="border p-4 rounded-md space-y-4 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor={`liability-description-${index}`}>Liability Description</Label>
                          <Input
                            id={`liability-description-${index}`}
                            value={liability.description || ""}
                            onChange={(e) => {
                              const updatedLiabilities = [...formData["liabilities"]]
                              updatedLiabilities[index] = { ...liability, description: e.target.value }
                              handleInputChange("liabilities", updatedLiabilities)
                            }}
                            placeholder="e.g. Mortgage over 123 Short Street"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`liability-value-${index}`}>Amount</Label>
                          <Input
                            id={`liability-value-${index}`}
                            value={liability.value || ""}
                            onChange={(e) => {
                              const updatedLiabilities = [...formData["liabilities"]]
                              updatedLiabilities[index] = { ...liability, value: e.target.value }
                              handleInputChange("liabilities", updatedLiabilities)
                            }}
                            placeholder="e.g. $50,000"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`liability-ownership-${index}`}>Responsibility</Label>
                          <Select
                            value={liability.ownership || ""}
                            onValueChange={(value) => {
                              const updatedLiabilities = [...formData["liabilities"]]
                              updatedLiabilities[index] = { ...liability, ownership: value }
                              handleInputChange("liabilities", updatedLiabilities)
                            }}
                          >
                            <SelectTrigger id={`liability-ownership-${index}`}>
                              <SelectValue placeholder="Select responsibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Joint">Joint</SelectItem>
                              <SelectItem value="Mine">Mine</SelectItem>
                              <SelectItem value="Other party">Other party</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {index > 0 && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updatedLiabilities = formData["liabilities"].filter(
                                (_: any, i: number) => i !== index,
                              )
                              handleInputChange("liabilities", updatedLiabilities)
                            }}
                          >
                            Remove Liability
                          </Button>
                        )}
                      </div>
                    ))}

                  <Button
                    variant="outline"
                    onClick={() => {
                      const updatedLiabilities = [...formData["liabilities"], { id: Date.now() }]
                      handleInputChange("liabilities", updatedLiabilities)
                    }}
                    className="mt-2"
                  >
                    Add Another Liability
                  </Button>
                </div>

                {/* Superannuation */}
                <div className="space-y-2 pt-4">
                  <Label htmlFor="superannuation">What is the superannuation holdings of both parties?</Label>
                  <p className="text-sm text-muted-foreground">e.g Australian Super $50,000 Husband</p>
                  <Textarea
                    id="superannuation"
                    value={formData["superannuation"] || ""}
                    onChange={(e) => handleInputChange("superannuation", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Will any assets need to be valued?</Label>
                  <p className="text-sm text-muted-foreground">
                    (this is usually because you can not reach a mutual agreement as to their value)
                  </p>
                  <RadioGroup
                    value={formData["assets-valuation"] || ""}
                    onValueChange={(value) => handleInputChange("assets-valuation", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="valuation-yes" />
                      <Label htmlFor="valuation-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="valuation-no" />
                      <Label htmlFor="valuation-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initial-assets">
                    At the commencement of the relationship did either of you have any assets of significance?
                  </Label>
                  <Textarea
                    id="initial-assets"
                    value={formData["initial-assets"] || ""}
                    onChange={(e) => handleInputChange("initial-assets", e.target.value)}
                    className="min-h-[100px]"
                    placeholder="If so please advise details"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lump-sums">During the relationship did either of you receive any lump sums?</Label>
                  <p className="text-sm text-muted-foreground">(such as compensation payouts, inheritances or gifts)</p>
                  <Textarea
                    id="lump-sums"
                    value={formData["lump-sums"] || ""}
                    onChange={(e) => handleInputChange("lump-sums", e.target.value)}
                    className="min-h-[100px]"
                    placeholder="If so please provide details"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financial-arrangements">
                    Post separation, what arrangements are currently in place financially?
                  </Label>
                  <Textarea
                    id="financial-arrangements"
                    value={formData["financial-arrangements"] || ""}
                    onChange={(e) => handleInputChange("financial-arrangements", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financial-additional">Is there anything else you would like us to know?</Label>
                  <p className="text-sm text-muted-foreground">(e.g have you already reached an agreement?)</p>
                  <Textarea
                    id="financial-additional"
                    value={formData["financial-additional"] || ""}
                    onChange={(e) => handleInputChange("financial-additional", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="court" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Have you undertaken Mediation?</Label>
              <RadioGroup
                value={formData["undertaken-mediation"] || ""}
                onValueChange={(value) => handleInputChange("undertaken-mediation", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="mediation-yes" />
                  <Label htmlFor="mediation-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="mediation-no" />
                  <Label htmlFor="mediation-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mediation" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mediation-date">When did you last undertake Mediation?</Label>
              <Input
                id="mediation-date"
                type="date"
                value={formData["mediation-date"] || ""}
                onChange={(e) => handleInputChange("mediation-date", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Were you issued with a s.60I Certificate?</Label>
              <RadioGroup
                value={formData["s60i-certificate"] || ""}
                onValueChange={(value) => handleInputChange("s60i-certificate", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="s60i-yes" />
                  <Label htmlFor="s60i-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="s60i-no" />
                  <Label htmlFor="s60i-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["s60i-certificate"] === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="s60i-date">What date is the s.60I Certificate?</Label>
                <Input
                  id="s60i-date"
                  type="date"
                  value={formData["s60i-date"] || ""}
                  onChange={(e) => handleInputChange("s60i-date", e.target.value)}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="court2" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Are there any current court proceedings?</Label>
              <RadioGroup
                value={formData["current-proceedings"] || ""}
                onValueChange={(value) => handleInputChange("current-proceedings", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - childrens matters only" id="proceedings-children" />
                  <Label htmlFor="proceedings-children">Yes - childrens matters only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Property matters only" id="proceedings-property" />
                  <Label htmlFor="proceedings-property">Yes - Property matters only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Property and Children" id="proceedings-both" />
                  <Label htmlFor="proceedings-both">Yes - Property and Children</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Family Violence or Criminal proceedings" id="proceedings-violence" />
                  <Label htmlFor="proceedings-violence">Yes - Family Violence or Criminal proceedings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - Family Law and Family Violence" id="proceedings-law-violence" />
                  <Label htmlFor="proceedings-law-violence">Yes - Family Law and Family Violence</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="proceedings-no" />
                  <Label htmlFor="proceedings-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["current-proceedings"] && formData["current-proceedings"] !== "No" && (
              <>
                <div className="space-y-2">
                  <Label>Are you the applicant or respondent?</Label>
                  <RadioGroup
                    value={formData["court-role"] || ""}
                    onValueChange={(value) => handleInputChange("court-role", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Applicant" id="role-applicant" />
                      <Label htmlFor="role-applicant">Applicant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Respondent" id="role-respondent" />
                      <Label htmlFor="role-respondent">Respondent</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="court-date">When is the next Court date?</Label>
                  <Input
                    id="court-date"
                    type="date"
                    value={formData["court-date"] || ""}
                    onChange={(e) => handleInputChange("court-date", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>What is it next listed for?</Label>
                  <RadioGroup
                    value={formData["court-listing"] || ""}
                    onValueChange={(value) => handleInputChange("court-listing", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="First Return" id="listing-first" />
                      <Label htmlFor="listing-first">First Return</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Mention/Direction" id="listing-mention" />
                      <Label htmlFor="listing-mention">Mention/Direction</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Interim Hearing" id="listing-interim" />
                      <Label htmlFor="listing-interim">Interim Hearing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Final Hearing" id="listing-final" />
                      <Label htmlFor="listing-final">Final Hearing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="listing-other" />
                      <Label htmlFor="listing-other">Other</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="I do not know" id="listing-unknown" />
                      <Label htmlFor="listing-unknown">I do not know</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proceedings-details">Please provide details of the proceedings</Label>
                  <p className="text-sm text-muted-foreground">
                    Including when they were commenced and what orders are sought. Please also advise if they relate to
                    children's matter if an ICL has been appointed and if there is a currently Family report or Children
                    Memorandum.
                  </p>
                  <Textarea
                    id="proceedings-details"
                    value={formData["proceedings-details"] || ""}
                    onChange={(e) => handleInputChange("proceedings-details", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-md">
                  <p className="text-sm">
                    Please provide a copy of all court orders and documents to reception@amandalittleassociates.com.au
                    prior to your scheduled conference.
                  </p>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="violence" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Is there a history of physical, verbal or emotional abuse in this relationship?</Label>
              <RadioGroup
                value={formData["abuse-history"] || ""}
                onValueChange={(value) => handleInputChange("abuse-history", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="abuse-yes" />
                  <Label htmlFor="abuse-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="abuse-no" />
                  <Label htmlFor="abuse-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Has there been any recent physical violence, threats or intimidation from the other party?</Label>
              <RadioGroup
                value={formData["recent-violence"] || ""}
                onValueChange={(value) => handleInputChange("recent-violence", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="recent-violence-yes" />
                  <Label htmlFor="recent-violence-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="recent-violence-no" />
                  <Label htmlFor="recent-violence-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Is there a current AVO?</Label>
              <RadioGroup
                value={formData["current-avo"] || ""}
                onValueChange={(value) => handleInputChange("current-avo", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="avo-yes" />
                  <Label htmlFor="avo-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="avo-no" />
                  <Label htmlFor="avo-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Has there been any of the following?</Label>
              <RadioGroup
                value={formData["violence-type"] || ""}
                onValueChange={(value) => handleInputChange("violence-type", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Physical violence" id="violence-physical" />
                  <Label htmlFor="violence-physical">Physical violence (hitting, kicking, throwing objects etc)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Psychological/Emotional Abuse" id="violence-emotional" />
                  <Label htmlFor="violence-emotional">Psychological/Emotional Abuse (gas lighting, denigration)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Financial Abuse" id="violence-financial" />
                  <Label htmlFor="violence-financial">Financial Abuse (withholding money)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="All of the above" id="violence-all" />
                  <Label htmlFor="violence-all">All of the above</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="violence-other" />
                  <Label htmlFor="violence-other">Other</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="violence-none" />
                  <Label htmlFor="violence-none">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["violence-type"] && formData["violence-type"] !== "No" && (
              <div className="space-y-2">
                <Label htmlFor="violence-details">
                  If you feel comfortable please provide details below. Otherwise, I will contact you to discuss.
                </Label>
                <Textarea
                  id="violence-details"
                  value={formData["violence-details"] || ""}
                  onChange={(e) => handleInputChange("violence-details", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="violence-additional">Is there anything further we should know?</Label>
              <Textarea
                id="violence-additional"
                value={formData["violence-additional"] || ""}
                onChange={(e) => handleInputChange("violence-additional", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Are there any health issues that may affect your ability to provide instructions?</Label>
              <p className="text-sm text-muted-foreground">
                (health issues may include depression, post natal depression, anxiety, grief, extreme emotional
                distress, dementia or other mental health issues)
              </p>
              <RadioGroup
                value={formData["health-issues"] || ""}
                onValueChange={(value) => handleInputChange("health-issues", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="health-yes" />
                  <Label htmlFor="health-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="health-no" />
                  <Label htmlFor="health-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["health-issues"] === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="health-details">
                  Can you please provide details of the health issues that may affect your ability to provide
                  instructions.
                </Label>
                <Textarea
                  id="health-details"
                  value={formData["health-details"] || ""}
                  onChange={(e) => handleInputChange("health-details", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="health-other" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Are there any health issues that may affect the other party's ability to respond?</Label>
              <RadioGroup
                value={formData["other-health-issues"] || ""}
                onValueChange={(value) => handleInputChange("other-health-issues", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="other-health-yes" />
                  <Label htmlFor="other-health-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="other-health-no" />
                  <Label htmlFor="other-health-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["other-health-issues"] === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="other-health-details">
                  Can you please provide details of the health issues that may affect the other side's ability to
                  respond.
                </Label>
                <Textarea
                  id="other-health-details"
                  value={formData["other-health-details"] || ""}
                  onChange={(e) => handleInputChange("other-health-details", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="legal-advice" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Have you had any legal advice?</Label>
              <RadioGroup
                value={formData["previous-legal-advice"] || ""}
                onValueChange={(value) => handleInputChange("previous-legal-advice", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - current" id="legal-current" />
                  <Label htmlFor="legal-current">Yes - current</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes - previously" id="legal-previous" />
                  <Label htmlFor="legal-previous">Yes - previously</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="legal-no" />
                  <Label htmlFor="legal-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData["previous-legal-advice"] && formData["previous-legal-advice"] !== "No" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="lawyer-full-name">What is your current/previous lawyer's full name?</Label>
                  <Input
                    id="lawyer-full-name"
                    value={formData["lawyer-full-name"] || ""}
                    onChange={(e) => handleInputChange("lawyer-full-name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lawyer-advice">What did they advise you on? and what advice did they provide?</Label>
                  <p className="text-sm text-muted-foreground">
                    (this helps us understand at what stage your matter is at)
                  </p>
                  <Textarea
                    id="lawyer-advice"
                    value={formData["lawyer-advice"] || ""}
                    onChange={(e) => handleInputChange("lawyer-advice", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="priorities" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="important-topics">
                What are the most important things we can talk to you about at your meeting with us?
              </Label>
              <Textarea
                id="important-topics"
                value={formData["important-topics"] || ""}
                onChange={(e) => handleInputChange("important-topics", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desired-outcome">What do you think would be a good outcome in your situation?</Label>
              <Textarea
                id="desired-outcome"
                value={formData["desired-outcome"] || ""}
                onChange={(e) => handleInputChange("desired-outcome", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="final" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="office-location">Which office is closest to you?</Label>
              <Select
                value={formData["office-location"] || ""}
                onValueChange={(value) => handleInputChange("office-location", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select office location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Penrith">Penrith</SelectItem>
                  <SelectItem value="Richmond">Richmond</SelectItem>
                  <SelectItem value="Oran Park">Oran Park</SelectItem>
                  <SelectItem value="Orange">Orange</SelectItem>
                  <SelectItem value="Southern Highlands">Southern Highlands</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral-source">How did you find out about us?</Label>
              <Select
                value={formData["referral-source"] || ""}
                onValueChange={(value) => handleInputChange("referral-source", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select referral source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Previous client referral">Previous client referral</SelectItem>
                  <SelectItem value="Solicitor referral">Solicitor referral</SelectItem>
                  <SelectItem value="Website via Google">Website via Google</SelectItem>
                  <SelectItem value="Facebook/Facebook Group">Facebook/Facebook Group</SelectItem>
                  <SelectItem value="Radio">Radio</SelectItem>
                  <SelectItem value="Newspaper">Newspaper</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData["referral-source"] === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="referrer-name">
                  If you are comfortable in doing so, can you please advise the name of the person who referred you (as
                  we would like to thank them for their referral)
                </Label>
                <Input
                  id="referrer-name"
                  value={formData["referrer-name"] || ""}
                  onChange={(e) => handleInputChange("referrer-name", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additional-info">
                Is there anything else that is important to mention or questions you'd like answered in the
                consultation?
              </Label>
              <Textarea
                id="additional-info"
                value={formData["additional-info"] || ""}
                onChange={(e) => handleInputChange("additional-info", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <div>
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSaveProgress}>
            <Save className="mr-2 h-4 w-4" /> Save Progress
          </Button>
          <Button onClick={currentStep === totalSteps - 1 ? handleSubmit : handleNext}>
            {currentStep === totalSteps - 1 ? "Submit" : "Next"}
            {currentStep !== totalSteps - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
