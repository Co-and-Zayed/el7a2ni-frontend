export const useTimeFormat = () => {
  const defaultLanguage = "en-US";

  function formatDate(dateString: any) {
    const inputDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (inputDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (inputDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return inputDate.toLocaleDateString(defaultLanguage, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  const getTimeFromDate = (dateStr: string) => {
    var date = new Date(dateStr);
    var datetime = date.toLocaleString(defaultLanguage, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return datetime;
  };

  const getTimeAgo = (dateStr: string) => {
    const timeDifference = new Date(dateStr).getTime() - new Date().getTime();

    const relativeFormat = (
      lang: string,
      value: number,
      duration: Intl.RelativeTimeFormatUnit
    ) => {
      return new Intl.RelativeTimeFormat(lang, {
        numeric: "auto",
      }).format(value, duration);
    };

    const replaceArabic = (str: string) => {
      return str;
    };

    const timeInYears = Math.ceil(timeDifference / 1000 / 60 / 60 / 24 / 365);
    const timeInMonths = Math.ceil(timeDifference / 1000 / 60 / 60 / 24 / 30);
    const timeInWeeks = Math.ceil(timeDifference / 1000 / 60 / 60 / 24 / 7);
    const timeInDays = Math.ceil(timeDifference / 1000 / 60 / 60 / 24);
    const timeInHours = Math.ceil(timeDifference / 1000 / 60 / 60);
    const timeInMinutes = Math.ceil(timeDifference / 1000 / 60);
    const timeInSeconds = Math.ceil(timeDifference / 1000);

    if (Math.abs(timeInYears) >= 1)
      return replaceArabic(relativeFormat("en", timeInYears, "years"));
    else if (Math.abs(timeInMonths) >= 1)
      return replaceArabic(relativeFormat("en", timeInMonths, "months"));
    else if (Math.abs(timeInWeeks) >= 1)
      return replaceArabic(relativeFormat("en", timeInWeeks, "weeks"));
    else if (Math.abs(timeInDays) >= 1)
      return replaceArabic(relativeFormat("en", timeInDays, "days"));
    else if (Math.abs(timeInHours) >= 1)
      return replaceArabic(relativeFormat("en", timeInHours, "hours"));
    else if (Math.abs(timeInMinutes) >= 2)
      return replaceArabic(relativeFormat("en", timeInMinutes, "minutes"));
    else if (Math.abs(timeInSeconds) >= 30)
      return replaceArabic(relativeFormat("en", timeInSeconds, "seconds"));
    else return "Just now";
  };

  return { getTimeFromDate, getTimeAgo, formatDate };
};
