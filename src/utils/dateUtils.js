export function getTimeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now - postDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
  
    if (diffMinutes < 1) return "Postado agora";
    if (diffMinutes < 60) return `Postado há ${diffMinutes} minuto${diffMinutes === 1 ? "" : "s"}`;
    if (diffHours < 24) return `Postado há ${diffHours} hora${diffHours === 1 ? "" : "s"}`;
    if (diffDays < 30) return `Postado há ${diffDays} dia${diffDays === 1 ? "" : "s"}`;
    if (diffMonths < 12) return `Postado há ${diffMonths} ${diffMonths === 1 ? "mês" : "meses"}`;
    return `Postado há ${diffYears} ano${diffYears === 1 ? "" : "s"}`;
  }