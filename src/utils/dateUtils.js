export function getTimeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now - postDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
  
    if (diffMinutes < 1) return "Posted just now";
    if (diffMinutes < 60) return `Posted ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
    if (diffHours < 24) return `Posted ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    if (diffDays < 30) return `Posted ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    if (diffMonths < 12) return `Posted ${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
    return `Posted ${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
  }