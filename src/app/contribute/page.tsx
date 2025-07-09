import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Cpu } from "lucide-react";

const teamMembers = [
  { name: "Purvi Passi", initial: "PP", img: "/images/purvi.jpeg" }, // Absolute path
  { name: "Advika Sawant", initial: "AS", img: "/images/advika.jpeg" }, // Absolute path
  { name: "Swastik Sharma", initial: "SS", img: "/images/swastik.jpeg" }, // Absolute path
  { name: "Ashlin Jose", initial: "AJ", img: "/images/ashlin.jpeg" }, // Absolute path
];

export default function ContributePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">Chasing the Cloud</h1>
            <p className="mt-4 text-lg text-muted-foreground">Leveraging Diffusion Models for Cloud Motion Prediction using INSAT-3DR/3DS Imagery.</p>
        </div>

        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-6 h-6" />
                    About The Project
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This project focuses on predicting cloud motion using diffusion models, a class of deep generative networks, applied to satellite imagery from INSAT-3DR/3DS. Traditional optical flow or physics-based models often falter when confronted with volatile weather dynamics. In contrast, this approach uses spatio-temporal learning to simulate realistic cloud evolution from multi-spectral past frames, delivering enhanced forecasting for short-term (0–3 hours) applications including nowcasting and early warnings for severe weather events. Our goal is to demonstrate the viability of indigenous satellite data for frontier AI research in meteorology.
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Meet the Team
                </CardTitle>
                <CardDescription>The minds behind NimbusCast.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center text-center gap-4">
                             <Avatar className="h-24 w-24 border-2 border-primary">
                                <AvatarImage src={member.img} data-ai-hint="profile picture" alt={member.name} />
                                <AvatarFallback>{member.initial}</AvatarFallback>
                            </Avatar>
                            <div >
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
