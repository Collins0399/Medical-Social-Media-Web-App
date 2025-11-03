import React from 'react';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { subscriptionPlans, currentUser } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function SubscriptionPage() {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1>Upgrade to Premium</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Unlock exclusive features and take your medical career to the next level
          </p>
        </div>

        {/* Current Subscription Status */}
        {currentUser.isPremium && (
          <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="flex items-center gap-2">
                      <span>Premium Member</span>
                      <Badge className="bg-yellow-500">Active</Badge>
                    </p>
                    <p className="text-sm text-gray-600">Your subscription renews on December 15, 2024</p>
                  </div>
                </div>
                <Button variant="outline">Manage Subscription</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {subscriptionPlans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative ${
                index === 1 ? 'border-2 border-blue-600 shadow-lg scale-105' : ''
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  {index === 0 ? (
                    <Zap className="w-12 h-12 text-gray-400" />
                  ) : index === 1 ? (
                    <Crown className="w-12 h-12 text-yellow-500" />
                  ) : (
                    <Star className="w-12 h-12 text-purple-500" />
                  )}
                </div>
                <h3 className="mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-500">/{plan.interval === 'monthly' ? 'mo' : 'yr'}</span>
                  )}
                </div>
                {index === 2 && (
                  <p className="text-sm text-green-600">Save $20/year</p>
                )}
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={`w-full ${
                        index === 1 ? 'bg-blue-600 hover:bg-blue-700' : ''
                      }`}
                      variant={index === 0 ? 'outline' : 'default'}
                      disabled={index === 0 && !currentUser.isPremium}
                    >
                      {index === 0
                        ? 'Current Plan'
                        : currentUser.isPremium
                        ? 'Switch Plan'
                        : 'Upgrade Now'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Subscribe to {plan.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span>{plan.name}</span>
                          <span>${plan.price}/{plan.interval === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Billing cycle</span>
                          <span>{plan.interval === 'monthly' ? 'Monthly' : 'Yearly'}</span>
                        </div>
                      </div>

                      <div>
                        <Label>Payment Method</Label>
                        <Select defaultValue="card">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="mobile">Mobile Money</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Card Number</Label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiry Date</Label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input placeholder="123" type="password" />
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex justify-between mb-2">
                          <span>Total</span>
                          <span className="text-xl">${plan.price}</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          By confirming, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </div>

                      <Button className="w-full">Confirm Payment</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Features Showcase */}
        <div className="mb-12">
          <h2 className="text-center mb-8">What You Get with Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2">Post Job Opportunities</h3>
                <p className="text-sm text-gray-600">
                  Share job openings with the medical community
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="mb-2">Apply to Premium Jobs</h3>
                <p className="text-sm text-gray-600">
                  Access exclusive job listings and opportunities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="mb-2">Exclusive Content</h3>
                <p className="text-sm text-gray-600">
                  Access premium articles, videos, and resources
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="mb-2">Priority Support</h3>
                <p className="text-sm text-gray-600">
                  Get faster responses and dedicated assistance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <h2>Frequently Asked Questions</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="mb-2">Can I cancel my subscription anytime?</p>
                <p className="text-sm text-gray-600">
                  Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.
                </p>
              </div>
              <div>
                <p className="mb-2">What payment methods do you accept?</p>
                <p className="text-sm text-gray-600">
                  We accept credit/debit cards, bank transfers, and mobile money payments.
                </p>
              </div>
              <div>
                <p className="mb-2">Can I switch between plans?</p>
                <p className="text-sm text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div>
                <p className="mb-2">Is there a refund policy?</p>
                <p className="text-sm text-gray-600">
                  We offer a 7-day money-back guarantee for all new subscriptions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
