import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, User, Calendar, MapPin } from "lucide-react"

export interface UserProfileProps {
    user: {
        id: string
        email: string
        username: string
        displayName: string | null
        bio: string | null
        location: string | null
        job: string | null
        website: string | null
        avatar: string | null
        createdAt: Date
    }
}

export function UserProfile({ user }: UserProfileProps) {
    const getInitials = () => {
        if (user.displayName) {
            return user.displayName.charAt(0).toUpperCase()
        }
        return user.username.charAt(0).toUpperCase()
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-col items-center space-y-4 pb-2">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || ""} alt={user.username} />
                    <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                    <h2 className="text-2xl font-bold">{user.displayName || user.username}</h2>
                    <p className="text-muted-foreground">@{user.username}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                </div>

                {user.location && (
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{user.location}</span>
                    </div>
                )}

                {user.job && (
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{user.job}</span>
                    </div>
                )}

                {user.bio && (
                    <div className="pt-2">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Bio</h3>
                        <p>{user.bio}</p>
                    </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Joined {formatDate(user.createdAt)}</span>
                </div>
            </CardContent>
        </Card>
    )
}

