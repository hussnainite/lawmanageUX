"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function IntakeFormPreview() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formComplete, setFormComplete] = useState(false)

  const steps = [
    { id: "introduction", title: "Introduction" },
    { id: "otherside", title: "Other Party Details" },
    { id: "relationship", title: "Relationship Details" },
    { id: "children", title: "Children" },
    { id: "financial", title: "Financial & Property" },
    { id: "final", title: "Final Questions" },
  ]

  const totalSteps = steps.length

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setFormComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <Card className="shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Family Law Intake Form</CardTitle>
          <CardDescription>
            Please complete this form to provide us with information about your family law matter.
          </CardDescription>
        </CardHeader>

        {!formComplete ? (
          <>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {totalSteps}
                  </span>
                </div>
                <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-bold mb-1">{steps[currentStep].title}</h2>
                <Separator className="my-4" />
              </div>

              {/* Sample form fields for preview */}
              <div className="space-y-4">
                {currentStep === 0 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Your Full Name</Label>
                      <Input id="full-name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="other-name">What is other Party's full name?</Label>
                      <Input id="other-name" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Do they have a lawyer?</Label>
                      <RadioGroup defaultValue="No">
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
                  </>
                )}

                {/* Placeholder for other steps */}
                {currentStep > 1 && (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">
                      This is a preview of the {steps[currentStep].title} section.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNext}>
                {currentStep === totalSteps - 1 ? "Submit" : "Next"}
                {currentStep !== totalSteps - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </>
        ) : (
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 text-green-800 rounded-full p-4">
                  <Check className="h-12 w-12" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Thank You!</h2>
              <p className="max-w-md mx-auto">
                We will send you a confirmation email with everything confirmed and discussed. If you do not receive an
                email please call us.
              </p>
              <Button variant="outline" className="mt-4">
                Return to Home
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
