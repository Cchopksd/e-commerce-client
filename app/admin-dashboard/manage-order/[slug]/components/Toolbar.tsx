"use client";
import React, { useState } from "react";
import {
  Printer,
  Download,
  Send,
  Ban,
  CheckCircle2,
  Truck,
  PackageCheck,
  RotateCcw,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import { updateOrderStatus } from "./action";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { updateOrderStatusValue } from "@/libs/features/admin/manageOrderSlice";
import Shipping from "./Shipping";

export enum OrderStatus {
  All = "all",
  Unpaid = "unpaid",
  Paid = "paid",
  InProcess = "in-process",
  Cancelled = "cancelled",
  Delivered = "delivered",
  Refund = "refund",
  Refunded = "refunded",
  Failed = "failed",
  Successfully = "successfully",
}

interface ToolbarProps {
  orderStatus: OrderStatus;
  orderId: string;
}

const FINISHED_STATUSES: readonly OrderStatus[] = [
  OrderStatus.Cancelled,
  OrderStatus.Successfully,
  OrderStatus.Refund,
  OrderStatus.Refunded,
] as const;

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "success" | "danger" | "warning" | "outline";
  isLoading?: boolean;
}

const ActionButton = ({
  onClick,
  icon,
  label,
  variant = "default",
  isLoading,
}: ActionButtonProps) => {
  const variants = {
    default: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50",
    success:
      "text-white bg-green-600 border border-green-600 hover:bg-green-700",
    danger: "text-white bg-red-600 border border-red-600 hover:bg-red-700",
    warning:
      "text-yellow-600 bg-white border border-yellow-600 hover:bg-yellow-50",
    outline: "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        inline-flex items-center gap-2 
        px-3 py-2 
        text-sm font-medium 
        rounded-md 
        transition-colors 
        duration-200
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-blue-500
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
      `}>
      {isLoading ? <span className="animate-spin">●</span> : icon}
      {label && <span>{label}</span>}
    </button>
  );
};

interface StatusActionsProps {
  status: OrderStatus;
  onUpdateStatus: (status: OrderStatus) => void;
  isLoading?: boolean;
}

const StatusActions = ({
  status,
  onUpdateStatus,
  isLoading,
}: StatusActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {status === OrderStatus.Unpaid && (
        <>
          <ActionButton
            onClick={() => onUpdateStatus(OrderStatus.Paid)}
            icon={<CheckCircle2 className="w-4 h-4" />}
            label="ยืนยันการชำระเงิน"
            variant="success"
            isLoading={isLoading}
          />
          <ActionButton
            onClick={() => onUpdateStatus(OrderStatus.Cancelled)}
            icon={<Ban className="w-4 h-4" />}
            label="ยกเลิกออเดอร์"
            variant="danger"
            isLoading={isLoading}
          />
        </>
      )}

      {status === OrderStatus.Paid && (
        <>
          <ActionButton
            onClick={() => onUpdateStatus(OrderStatus.InProcess)}
            icon={<PackageCheck className="w-4 h-4" />}
            label="เริ่มจัดเตรียมสินค้า"
            variant="success"
            isLoading={isLoading}
          />
          <ActionButton
            onClick={() => onUpdateStatus(OrderStatus.Cancelled)}
            icon={<Ban className="w-4 h-4" />}
            label="ยกเลิกออเดอร์"
            variant="danger"
            isLoading={isLoading}
          />
        </>
      )}

      {status === OrderStatus.InProcess && (
        <ActionButton
          onClick={() => onUpdateStatus(OrderStatus.Delivered)}
          icon={<Truck className="w-4 h-4" />}
          label="เริ่มจัดส่งสินค้า"
          variant="success"
          isLoading={isLoading}
        />
      )}

      {status === OrderStatus.Delivered && (
        <ActionButton
          onClick={() => onUpdateStatus(OrderStatus.Successfully)}
          icon={<CheckCircle2 className="w-4 h-4" />}
          label="จัดส่งสำเร็จ"
          variant="success"
          isLoading={isLoading}
        />
      )}

      {status === OrderStatus.Cancelled && (
        <ActionButton
          onClick={() => onUpdateStatus(OrderStatus.Unpaid)}
          icon={<RotateCcw className="w-4 h-4" />}
          label="คืนสถานะรอชำระเงิน"
          variant="warning"
          isLoading={isLoading}
        />
      )}

      {status === OrderStatus.Failed && (
        <ActionButton
          onClick={() => onUpdateStatus(OrderStatus.Refund)}
          icon={<RotateCcw className="w-4 h-4" />}
          label="คืนเงินลูกค้า"
          variant="warning"
          isLoading={isLoading}
        />
      )}

      {!FINISHED_STATUSES.includes(status as any) && (
        <ActionButton
          onClick={() => {}}
          icon={<AlertCircle className="w-4 h-4" />}
          label="แจ้งปัญหา"
          variant="warning"
        />
      )}
    </div>
  );
};

interface MobileViewProps {
  onPrint: () => void;
  onDownload: () => void;
  onSendEmail: () => void;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  status: OrderStatus;
  onUpdateStatus: (status: OrderStatus) => void;
  isLoading?: boolean;
}

const MobileView = ({
  onPrint,
  onDownload,
  onSendEmail,
  showMenu,
  setShowMenu,
  status,
  onUpdateStatus,
  isLoading,
}: MobileViewProps) => {
  return (
    <div className="lg:hidden">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <ActionButton
              onClick={onPrint}
              icon={<Printer className="w-4 h-4" />}
              label="พิมพ์"
              variant="outline"
            />
            <ActionButton
              onClick={onDownload}
              icon={<Download className="w-4 h-4" />}
              label="ดาวน์โหลด"
              variant="outline"
            />
            <ActionButton
              onClick={onSendEmail}
              icon={<Send className="w-4 h-4" />}
              label="ส่งอีเมล"
              variant="outline"
            />
          </div>

          <ActionButton
            onClick={() => setShowMenu(!showMenu)}
            icon={<MoreVertical className="w-4 h-4" />}
            label=""
            variant="outline"
          />
        </div>

        {/* แสดง StatusActions เมื่อเปิดเมนู */}
        {showMenu && (
          <StatusActions
            status={status}
            onUpdateStatus={onUpdateStatus}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default function Toolbar({ orderStatus, orderId }: ToolbarProps) {
  const orderStatusValue = useAppSelector(
    (state) => state.manageOrder.orderStatusValue,
  );
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingDelivering, setIsUpdatingDelivering] = useState(false);

  const [effectiveOrderStatus, setEffectiveOrderStatus] = useState(
    orderStatus || orderStatusValue,
  );

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const onPrint = () => {
    console.log("print");
  };

  const onDownload = () => {
    console.log("download");
  };

  const onSendEmail = () => {
    console.log("send email");
  };

  const onUpdateStatus = async (status: OrderStatus) => {
    try {
      setIsUpdating(true);
      if (status === OrderStatus.Delivered) {
        return setIsUpdatingDelivering(true);
      }
      const result = await updateOrderStatus({
        orderId,
        status,
        shipping_provider: null,
        tracking_id: null,
      });
      if (result) {
        dispatch(updateOrderStatusValue(result.status));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      // TODO: Add error toast notification
    } finally {
      setIsUpdating(false);
    }
  };

  React.useEffect(() => {
    setEffectiveOrderStatus((orderStatusValue || orderStatus) as OrderStatus);
  }, [orderStatusValue, orderStatus]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Desktop View */}
      <div className="hidden lg:flex flex-wrap gap-3 items-center justify-between">
        {/* Basic Actions */}
        <div className="flex flex-wrap gap-2">
          <ActionButton
            onClick={onPrint}
            icon={<Printer className="w-4 h-4" />}
            label="พิมพ์ใบสั่งซื้อ"
            variant="outline"
          />
          <ActionButton
            onClick={onDownload}
            icon={<Download className="w-4 h-4" />}
            label="ดาวน์โหลด PDF"
            variant="outline"
          />
          <ActionButton
            onClick={onSendEmail}
            icon={<Send className="w-4 h-4" />}
            label="ส่งอีเมล"
            variant="outline"
          />
        </div>

        {effectiveOrderStatus === OrderStatus.Successfully ? (
          <div className="text-green-600 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>ออเดอร์นี้เสร็จสมบูรณ์แล้ว</span>
          </div>
        ) : (
          <StatusActions
            status={effectiveOrderStatus}
            onUpdateStatus={onUpdateStatus}
            isLoading={isUpdating}
          />
        )}
      </div>
      {/* Mobile View */}
      <MobileView
        onPrint={onPrint}
        onDownload={onDownload}
        onSendEmail={onSendEmail}
        showMenu={showMobileMenu}
        setShowMenu={setShowMobileMenu}
        status={effectiveOrderStatus}
        onUpdateStatus={onUpdateStatus}
        isLoading={isUpdating}
      />
      {isUpdatingDelivering && (
        <Shipping
          orderId={orderId}
          isUpdatingDelivering={isUpdatingDelivering}
          setIsUpdatingDelivering={setIsUpdatingDelivering}
        />
      )}
    </div>
  );
}
