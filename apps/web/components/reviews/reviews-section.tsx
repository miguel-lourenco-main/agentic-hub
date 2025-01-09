"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import { ReviewCard, type Review } from "./review-card";

interface ReviewsSectionProps {
  agentId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function ReviewsSection({
  agentId,
  reviews,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  const [newRating, setNewRating] = React.useState(0);
  const [newComment, setNewComment] = React.useState("");

  const handleSubmitReview = () => {
    // TODO: Implement review submission
    console.log("Submitting review:", {
      agentId,
      rating: newRating,
      comment: newComment,
    });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <StarRating rating={averageRating} readOnly />
            <span className="text-xl font-semibold">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Write a Review */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-semibold">Write a Review</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <StarRating
              rating={newRating}
              onRatingChange={setNewRating}
              size="lg"
            />
            {newRating > 0 && (
              <span className="text-sm text-muted-foreground">
                {newRating} star{newRating !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <Textarea
            placeholder="Share your experience with this agent..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button
            onClick={handleSubmitReview}
            disabled={newRating === 0 || !newComment.trim()}
          >
            Submit Review
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-semibold">Reviews</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No reviews yet. Be the first to review this agent!
          </p>
        )}
      </div>
    </div>
  );
}
