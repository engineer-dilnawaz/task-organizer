export const randomColorGen = () => {
  const vibrantColors = [
    // Reds & Oranges
    "#FF5733", // Red-Orange
    "#FF6B35", // Bright Orange
    "#FF8C42", // Orange
    "#FFA500", // Orange
    "#FF6B6B", // Coral Red
    "#FF4757", // Red
    "#FF3838", // Bright Red
    "#FF1744", // Deep Red

    // Yellows & Golds
    "#FFC300", // Yellow
    "#FFD700", // Gold
    "#FFEB3B", // Bright Yellow
    "#FFC107", // Amber
    "#FFB300", // Dark Yellow
    "#FFA000", // Deep Amber

    // Greens
    "#33FF57", // Bright Green
    "#4CAF50", // Green
    "#00E676", // Light Green
    "#00C853", // Green
    "#66BB6A", // Light Green
    "#43A047", // Medium Green
    "#2E7D32", // Dark Green
    "#1B5E20", // Deep Green

    // Blues
    "#3357FF", // Blue
    "#2196F3", // Blue
    "#03A9F4", // Light Blue
    "#00BCD4", // Cyan
    "#0097A7", // Teal
    "#0288D1", // Dark Blue
    "#1976D2", // Blue
    "#0D47A1", // Deep Blue
    "#3F51B5", // Indigo
    "#5C6BC0", // Light Indigo

    // Purples & Pinks
    "#FF33A1", // Pink
    "#E91E63", // Pink
    "#EC407A", // Light Pink
    "#F06292", // Pink
    "#9C27B0", // Purple
    "#BA68C8", // Light Purple
    "#7B1FA2", // Purple
    "#6A1B9A", // Deep Purple
    "#AB47BC", // Purple
    "#CE93D8", // Light Purple

    // Teals & Cyans
    "#00ACC1", // Cyan
    "#00897B", // Teal
    "#00695C", // Dark Teal
    "#26A69A", // Teal
    "#4DB6AC", // Light Teal

    // Additional Vibrant Colors
    "#FF5722", // Deep Orange
    "#FF9800", // Orange
    "#F57C00", // Dark Orange
    "#E64A19", // Deep Orange Red
    "#D32F2F", // Red
    "#C2185B", // Pink Red
    "#AD1457", // Deep Pink
    "#8E24AA", // Purple
    "#5E35B1", // Deep Purple
    "#3949AB", // Indigo Blue
    "#1E88E5", // Blue
    "#00ACC1", // Cyan
    "#00897B", // Teal
    "#43A047", // Green
    "#7CB342", // Light Green
    "#C0CA33", // Lime
    "#FDD835", // Yellow
    "#FFB300", // Amber
    "#FB8C00", // Orange
    "#F4511E", // Deep Orange
  ];

  return vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
};
