'use client';

import { useEffect, useRef } from 'react';
import { recordViewAction } from '../actions/blog.action';

interface ArticleViewTrackerProps {
  postId: number;
}

export function ArticleViewTracker({ postId }: ArticleViewTrackerProps) {
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    recordViewAction(postId).catch(() => {});
  }, [postId]);

  return null;
}

