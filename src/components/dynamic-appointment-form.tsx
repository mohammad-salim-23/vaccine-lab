"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { createAppointment } from "@/actions/appointment/create-appointment"
import { getVaccineList } from "@/actions/vaccine/get-veccine-list"

interface FormData {
  name: string
  dob: string
  gender: string
  fathersName: string
  mothersName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  country: string
  vaccinationType: string
  nationalId: string
}

interface VaccinationType {
  id: string
  name: string
}

export default function DynamicAppointmentForm() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      dob: "",
      gender: "",
      fathersName: "",
      mothersName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      vaccinationType: "",
      nationalId: "",
    },
  })

  const [vaccinationTypes, setVaccinationTypes] = useState<VaccinationType[]>([
    { id: "1", name: "COVID-19" },
    { id: "2", name: "Influenza" },
    { id: "3", name: "Measles" },
    { id: "4", name: "Polio" },
  ])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState("")

  const fetchVaccinationTypes = async () => {
    try {
      // Mock API call - replace with actual API endpoint
      const response = await getVaccineList({})
      if (!response.data) {
        throw new Error("Failed to fetch vaccination types")
      }
      setVaccinationTypes(response.data)
    } catch (error) {
      console.error("Error fetching vaccination types:", error)
    }
  }

  useEffect(() => {
    fetchVaccinationTypes()
  }, [])

  const handleNidSearch = async () => {
    const nationalId = watch("nationalId")
    if (!nationalId.trim()) {
      setSearchError("Please enter a National ID or Birth Certificate number")
      return
    }

    setSearchLoading(true)
    setSearchError("")

    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch(`/api/nid?nid=${nationalId}`)
      if (!response.ok) {
        throw new Error("National ID not found")
      }

      const { data } = await response.json()

      // Auto-fill form fields with data from API
      setValue("name", data.name || "")
      setValue("dob", data.dob || "")
      setValue("gender", data.gender || "")
      setValue("fathersName", data.fatherName || "")
      setValue("mothersName", data.motherName || "")
      setValue("email", data.email || "")
      setValue("phone", data.phone || "")
      setValue("addressLine1", data.addressLine1 || "")
      setValue("addressLine2", data.addressLine2 || "")
      setValue("city", data.city || "")
      setValue("state", data.state || "")
      setValue("zip", data.postalCode || "")
      setValue("country", data.country || "")
      setSearchError("")
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : "Failed to search National ID")
    } finally {
      setSearchLoading(false)
    }
  }

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data)
    // Handle form submission logic here
    const appointmentData = createAppointment(data)
    console.log("Appointment created:", appointmentData)
  }

  return (
    <div className="w-full flex items-center justify-center p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Enter your personal details and vaccination information.
            </p>
          </div>

          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full">
                <Label htmlFor="national-id" className="text-sm font-medium text-foreground dark:text-foreground">
                  National ID / Birth Certificate
                </Label>
                <div className="mt-2 flex gap-2">
                  <Controller
                    name="nationalId"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        id="national-id"
                        placeholder="Enter your National ID or Birth Certificate"
                        className="flex-1"
                      />
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleNidSearch}
                    disabled={searchLoading}
                    className="whitespace-nowrap bg-transparent"
                  >
                    {searchLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
                {searchError && <p className="mt-2 text-xs text-destructive">{searchError}</p>}
                {errors.nationalId && <p className="mt-2 text-xs text-destructive">{errors.nationalId.message}</p>}
              </div>

              <div className="col-span-full">
                <Label htmlFor="name" className="text-sm font-medium text-foreground dark:text-foreground">
                  Full Name
                </Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <Input {...field} type="text" id="name" placeholder="Enter your full name" className="mt-2" />
                  )}
                />
                {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label htmlFor="dob" className="text-sm font-medium text-foreground dark:text-foreground">
                  Date of Birth
                </Label>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => <Input {...field} type="date" id="dob" className="mt-2" />}
                />
                {errors.dob && <p className="mt-2 text-xs text-destructive">{errors.dob.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label htmlFor="gender" className="text-sm font-medium text-foreground dark:text-foreground">
                  Gender
                </Label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="gender" className="mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && <p className="mt-2 text-xs text-destructive">{errors.gender.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label htmlFor="fathers-name" className="text-sm font-medium text-foreground dark:text-foreground">
                  Father&apos;s Name
                </Label>
                <Controller
                  name="fathersName"
                  control={control}
                  rules={{ required: "Father's name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id="fathers-name"
                      placeholder="Enter father's name"
                      className="mt-2"
                    />
                  )}
                />
                {errors.fathersName && <p className="mt-2 text-xs text-destructive">{errors.fathersName.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label htmlFor="mothers-name" className="text-sm font-medium text-foreground dark:text-foreground">
                  Mother&apos;s Name
                </Label>
                <Controller
                  name="mothersName"
                  control={control}
                  rules={{ required: "Mother's name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id="mothers-name"
                      placeholder="Enter mother's name"
                      className="mt-2"
                    />
                  )}
                />
                {errors.mothersName && <p className="mt-2 text-xs text-destructive">{errors.mothersName.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label htmlFor="email" className="text-sm font-medium text-foreground dark:text-foreground">
                  Email
                </Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Input {...field} type="email" id="email" placeholder="your@email.com" className="mt-2" />
                  )}
                />
                {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground dark:text-foreground">
                  Phone
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9\-+$$$$\s]+$/,
                      message: "Please enter a valid phone number",
                    },
                  }}
                  render={({ field }) => (
                    <Input {...field} type="tel" id="phone" placeholder="+1 (555) 000-0000" className="mt-2" />
                  )}
                />
                {errors.phone && <p className="mt-2 text-xs text-destructive">{errors.phone.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">Address Information</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Enter your complete address details.
            </p>
          </div>

          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full">
                <Label htmlFor="address-line-1" className="text-sm font-medium text-foreground dark:text-foreground">
                  Address Line 1
                </Label>
                <Controller
                  name="addressLine1"
                  control={control}
                  rules={{ required: "Address line 1 is required" }}
                  render={({ field }) => (
                    <Input {...field} type="text" id="address-line-1" placeholder="Street address" className="mt-2" />
                  )}
                />
                {errors.addressLine1 && <p className="mt-2 text-xs text-destructive">{errors.addressLine1.message}</p>}
              </div>

              <div className="col-span-full">
                <Label htmlFor="address-line-2" className="text-sm font-medium text-foreground dark:text-foreground">
                  Address Line 2
                </Label>
                <Controller
                  name="addressLine2"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id="address-line-2"
                      placeholder="Apartment, suite, etc. (optional)"
                      className="mt-2"
                    />
                  )}
                />
              </div>

              <div className="col-span-full sm:col-span-2">
                <Label htmlFor="city" className="text-sm font-medium text-foreground dark:text-foreground">
                  City
                </Label>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => <Input {...field} type="text" id="city" placeholder="City" className="mt-2" />}
                />
                {errors.city && <p className="mt-2 text-xs text-destructive">{errors.city.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-2">
                <Label htmlFor="state" className="text-sm font-medium text-foreground dark:text-foreground">
                  State / Province
                </Label>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Input {...field} type="text" id="state" placeholder="State" className="mt-2" />
                  )}
                />
                {errors.state && <p className="mt-2 text-xs text-destructive">{errors.state.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-2">
                <Label htmlFor="zip" className="text-sm font-medium text-foreground dark:text-foreground">
                  ZIP / Postal Code
                </Label>
                <Controller
                  name="zip"
                  control={control}
                  rules={{ required: "ZIP code is required" }}
                  render={({ field }) => <Input {...field} type="text" id="zip" placeholder="12345" className="mt-2" />}
                />
                {errors.zip && <p className="mt-2 text-xs text-destructive">{errors.zip.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-2">
                <Label htmlFor="country" className="text-sm font-medium text-foreground dark:text-foreground">
                  Country
                </Label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Input {...field} type="text" id="country" placeholder="Country" className="mt-2" />
                  )}
                />
                {errors.country && <p className="mt-2 text-xs text-destructive">{errors.country.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">Vaccination Information</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
              Select your vaccination details.
            </p>
          </div>

          <div className="sm:max-w-3xl md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full">
                <Label htmlFor="vaccination-type" className="text-sm font-medium text-foreground dark:text-foreground">
                  Vaccination Type
                </Label>
                <Controller
                  name="vaccinationType"
                  control={control}
                  rules={{ required: "Vaccination type is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="vaccination-type" className="mt-2">
                        <SelectValue placeholder="Select vaccination type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vaccinationTypes.map((vType) => (
                          <SelectItem key={vType.id} value={vType.id}>
                            {vType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.vaccinationType && (
                  <p className="mt-2 text-xs text-destructive">{errors.vaccinationType.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Submit buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" className="whitespace-nowrap bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="whitespace-nowrap">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
