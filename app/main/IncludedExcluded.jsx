"use client";
import { CheckCircle, XCircle } from "lucide-react";

const includedItems = [
    "Comfortable hotel accommodation (you will stay in different hotels along the route, depending on the location)",
    "All transfers included",
    "Professional guide support 24/7",
    "Horseback riding",
    "Breakfast",
    "Beautiful new location to explore every day"
];

const excludedItems = [
    "Flight tickets",
    "Lunch and Dinner",
    "Pocket expenses",
    "Insurance"
];

export default function IncludedExcluded() {
    return (
        <section
            className={
                "relative bg-fixed text-white min-h-[60vh] py-10 bg-cover"
            }
        >
            <div className="relative z-10 container px-20">
                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-10">What's included</h2>
                        <ul className="space-y-4">
                            {includedItems.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-10">What's excluded</h2>
                        <ul className="space-y-4">
                            {excludedItems.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    );
}
