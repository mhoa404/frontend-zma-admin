import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Filter } from "lucide-react";

export interface Sale {
  time: string;
  revenue: number;
}

export interface Inventory {
  category: string;
  quantity: number;
  color: string;
}

export interface ExportData {
  time: string;
  quantity: number;
}

export type TimeFilter = "day" | "week" | "month" | "year";

export type CustomTooltipProps = {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
};

const HomePage = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("month");
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [exportData, setExportData] = useState<ExportData[]>([]);
  const [focused, setFocused] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    new Date().toISOString().split("T")[0]
  );

  const mockData = {
    day: {
      sales: [
        { time: "00:00", revenue: 2000000 },
        { time: "04:00", revenue: 1500000 },
        { time: "08:00", revenue: 8000000 },
        { time: "12:00", revenue: 12000000 },
        { time: "16:00", revenue: 15000000 },
        { time: "20:00", revenue: 10000000 },
      ],
      inventory: [
        { category: "Áo thun", quantity: 120, color: "#ef4444" },
        { category: "Quần jean", quantity: 85, color: "#f97316" },
        { category: "Giày thể thao", quantity: 95, color: "#eab308" },
        { category: "Túi xách", quantity: 60, color: "#22c55e" },
        { category: "Mũ", quantity: 150, color: "#3b82f6" },
        { category: "Phụ kiện", quantity: 200, color: "#8b5cf6" },
      ],
      export: [
        { time: "00:00", quantity: 150 },
        { time: "04:00", quantity: 200 },
        { time: "08:00", quantity: 180 },
        { time: "12:00", quantity: 220 },
        { time: "16:00", quantity: 190 },
        { time: "20:00", quantity: 250 },
      ],
    },
    week: {
      sales: [
        { time: "Thứ 2", revenue: 25000000 },
        { time: "Thứ 3", revenue: 30000000 },
        { time: "Thứ 4", revenue: 28000000 },
        { time: "Thứ 5", revenue: 35000000 },
        { time: "Thứ 6", revenue: 45000000 },
        { time: "Thứ 7", revenue: 50000000 },
        { time: "CN", revenue: 40000000 },
      ],
      inventory: [
        { category: "Áo thun", quantity: 800, color: "#ef4444" },
        { category: "Quần jean", quantity: 650, color: "#f97316" },
        { category: "Giày thể thao", quantity: 720, color: "#eab308" },
        { category: "Túi xách", quantity: 450, color: "#22c55e" },
        { category: "Mũ", quantity: 980, color: "#3b82f6" },
        { category: "Phụ kiện", quantity: 1200, color: "#8b5cf6" },
      ],
      export: [
        { time: "Thứ 2", quantity: 1200 },
        { time: "Thứ 3", quantity: 1350 },
        { time: "Thứ 4", quantity: 1180 },
        { time: "Thứ 5", quantity: 1450 },
        { time: "Thứ 6", quantity: 1320 },
        { time: "Thứ 7", quantity: 1580 },
        { time: "CN", quantity: 1400 },
      ],
    },
    month: {
      sales: [
        { time: "T1", revenue: 180000000 },
        { time: "T2", revenue: 220000000 },
        { time: "T3", revenue: 250000000 },
        { time: "T4", revenue: 190000000 },
        { time: "T5", revenue: 280000000 },
        { time: "T6", revenue: 320000000 },
        { time: "T7", revenue: 350000000 },
        { time: "T8", revenue: 380000000 },
        { time: "T9", revenue: 290000000 },
        { time: "T10", revenue: 310000000 },
        { time: "T11", revenue: 400000000 },
        { time: "T12", revenue: 450000000 },
      ],
      inventory: [
        { category: "Áo thun", quantity: 2500, color: "#ef4444" },
        { category: "Quần jean", quantity: 1800, color: "#f97316" },
        { category: "Giày thể thao", quantity: 2200, color: "#eab308" },
        { category: "Túi xách", quantity: 1500, color: "#22c55e" },
        { category: "Mũ", quantity: 3200, color: "#3b82f6" },
        { category: "Phụ kiện", quantity: 4000, color: "#8b5cf6" },
      ],
      export: [
        { time: "T1", quantity: 8500 },
        { time: "T2", quantity: 9200 },
        { time: "T3", quantity: 7800 },
        { time: "T4", quantity: 10500 },
        { time: "T5", quantity: 9800 },
        { time: "T6", quantity: 11200 },
        { time: "T7", quantity: 10800 },
        { time: "T8", quantity: 12500 },
        { time: "T9", quantity: 9500 },
        { time: "T10", quantity: 11000 },
        { time: "T11", quantity: 13200 },
        { time: "T12", quantity: 14500 },
      ],
    },
    year: {
      sales: [
        { time: "2020", revenue: 2800000000 },
        { time: "2021", revenue: 3200000000 },
        { time: "2022", revenue: 3800000000 },
        { time: "2023", revenue: 4200000000 },
        { time: "2024", revenue: 4800000000 },
      ],
      inventory: [
        { category: "Áo thun", quantity: 15000, color: "#ef4444" },
        { category: "Quần jean", quantity: 12000, color: "#f97316" },
        { category: "Giày thể thao", quantity: 18000, color: "#eab308" },
        { category: "Túi xách", quantity: 8500, color: "#22c55e" },
        { category: "Mũ", quantity: 22000, color: "#3b82f6" },
        { category: "Phụ kiện", quantity: 28000, color: "#8b5cf6" },
      ],
      export: [
        { time: "2020", quantity: 85000 },
        { time: "2021", quantity: 92000 },
        { time: "2022", quantity: 105000 },
        { time: "2023", quantity: 118000 },
        { time: "2024", quantity: 132000 },
      ],
    },
  };

  useEffect(() => {
    const data = mockData[timeFilter];
    setSalesData(data.sales);
    setInventoryData(data.inventory);
    setExportData(data.export);
  }, [timeFilter, selectedDate]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("vi-VN").format(num);

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExport = exportData.reduce((sum, item) => sum + item.quantity, 0);
  const totalInventory = inventoryData.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const getCurrentLabel = (): string => {
    const now = new Date(selectedDate);

    switch (timeFilter) {
      case "day":
        return `Ngày ${now.toLocaleDateString("vi-VN")}`;
      case "week": {
        const day = now.getDay() || 7;
        const firstDay = new Date(now);
        firstDay.setDate(now.getDate() - day + 1);
        const lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);
        return `Tuần: ${firstDay.toLocaleDateString("vi-VN")} - ${lastDay.toLocaleDateString("vi-VN")}`;
      }
      case "month":
        return `Tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`;
      case "year":
        return `Năm ${now.getFullYear()}`;
      default:
        return "";
    }
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) =>
    active && payload && payload.length ? (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600">
          Doanh thu: {formatCurrency(payload[0].value)}
        </p>
      </div>
    ) : null;

  const ExportTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) =>
    active && payload && payload.length ? (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-green-600">
          Xuất kho: {formatNumber(payload[0].value)} sản phẩm
        </p>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Time Filter */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-700" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
              onBlur={() => setFocused(false)}
              className={`px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 transition ${
                focused ? "border-blue-500 ring-blue-500" : "border-gray-300"
              }`}
            >
              <option value="day">Theo Ngày</option>
              <option value="week">Theo Tuần</option>
              <option value="month">Theo Tháng</option>
              <option value="year">Theo Năm</option>
            </select>
          </div>

          {/* Date selector */}
          <div>
            {timeFilter === "day" && (
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800"
              />
            )}
            {timeFilter === "month" && (
              <input
                type="month"
                value={selectedDate.slice(0, 7)}
                onChange={(e) => setSelectedDate(e.target.value + "-01")}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800"
              />
            )}
            {timeFilter === "year" && (
              <input
                type="number"
                min="2000"
                max={new Date().getFullYear()}
                value={selectedDate.slice(0, 4)}
                onChange={(e) => setSelectedDate(`${e.target.value}-01-01`)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 w-28"
              />
            )}
          </div>
        </div>

        {/* Hiển thị ngày / tháng / năm đang xem */}
        <p className="text-gray-600 text-sm mb-4">{getCurrentLabel()}</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-blue-600">Tổng Doanh Thu</p>
            <p className="text-xl text-blue-600 font-bold">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-green-600">Tổng Xuất Kho</p>
            <p className="text-xl text-green-600 font-bold">
              {formatNumber(totalExport)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-amber-600">Tổng Tồn Kho</p>
            <p className="text-xl text-amber-600 font-bold">
              {formatNumber(totalInventory)}
            </p>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="flex flex-col gap-10">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                tickFormatter={(value) => formatNumber(value / 1000000) + "M"}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                name="Doanh thu (VNĐ)"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Export Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={exportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip content={<ExportTooltip />} />
              <Legend />
              <Bar
                dataKey="quantity"
                fill="#22c55e"
                name="Số lượng xuất kho"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
