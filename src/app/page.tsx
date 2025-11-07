import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Syringe,
  Shield,
  Calendar,
  FileCheck,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  User,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Syringe className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <span className="text-base sm:text-lg font-bold">VaccineHub</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#benefits"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Benefits
              </Link>
              <Link
                href="/verify-vaccine"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Verify Certificate
              </Link>
            </nav>

            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Staff Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Schedule Your Vaccination Appointment
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Book your vaccination appointment online. Safe, secure, and convenient access to
              vaccines for you and your family.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/appointment-form" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/verify-vaccine" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-base">
                <FileCheck className="w-5 h-5 mr-2" />
                Verify Certificate
              </Button>
            </Link>
          </div>

    
        </div>
      </section>

      <Separator />

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Getting vaccinated is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Book Appointment</CardTitle>
                <CardDescription>
                  Select your preferred date, time, and vaccination center online.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Visit Center</CardTitle>
                <CardDescription>
                  Arrive at the vaccination center at your scheduled time with valid ID.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Get Vaccinated</CardTitle>
                <CardDescription>
                  Receive your vaccine and get your digital certificate instantly.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Benefits Section */}
      <section
        id="benefits"
        className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Why Get Vaccinated?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Personal Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Protect yourself from serious illness
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Community Safety</h3>
                <p className="text-sm text-muted-foreground">Help protect your loved ones</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <FileCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Digital Certificate</h3>
                <p className="text-sm text-muted-foreground">Get verified proof instantly</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Quick & Easy</h3>
                <p className="text-sm text-muted-foreground">Fast appointment scheduling</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Ready to Get Vaccinated?</h2>
            <p className="text-sm sm:text-base opacity-90 max-w-2xl mx-auto">
              Take the first step towards protection. Book your appointment today and join thousands
              staying safe.
            </p>
            <Link href="/appointment-form">
              <Button size="lg" variant="secondary">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Your Appointment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary rounded-lg">
                  <Syringe className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">VaccineHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making vaccination accessible and convenient for everyone.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/appointment-form"
                    className="hover:text-foreground transition-colors"
                  >
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="/verify-vaccine" className="hover:text-foreground transition-colors">
                    Verify Certificate
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-foreground transition-colors">
                    Check Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Emergency: 911</li>
                <li>Support: 1-800-VACCINE</li>
                <li>info@vaccinehub.com</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 VaccineHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
