import { formatDistanceToNow } from "date-fns";
import { User } from "lucide-react";

import { StarRating } from "@/components/ui/star-rating";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-0 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={review.userImage} alt={review.userName} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {review.userName}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(review.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
          <StarRating rating={review.rating} readOnly size="sm" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
