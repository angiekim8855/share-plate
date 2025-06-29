export const statusStyles = {
    Pending: { backgroundColor: "#FFCC00", color: "#000" }, //노랑
    Canceled: { backgroundColor: "#FF6B6B", color: "#fff" }, //빨강
    Reserved: { backgroundColor: "#1E90FF", color: "#fff" }, //파랑
    Completed: { backgroundColor: "#4CAF50", color: "#fff" }, //초록
    Default: { backgroundColor: "#ccc", color: "#000" },
};

export const getStatusStyle = (status: string) => {
    return statusStyles[status as keyof typeof statusStyles] || statusStyles.Default;
};
