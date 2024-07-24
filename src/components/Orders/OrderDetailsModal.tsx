import { useState } from 'react';
import Order from '@/interfaces/order';
import { updateOrderStatus } from '@/features/Orders/ordersSlice';
import { useAppDispatch } from '@/app/hooks';

interface ModalPropsb {
  order: Order;
  close: () => void;
  cancel: (id: number) => void;
  edit: () => void;
  status: string;
}
interface ModalProps {
  order: Order;
  close: () => void;
  cancel: (id: number) => void;
}

function Modal({ close, order, cancel, edit, status }: ModalPropsb) {
  const billigDetails = order.deliveryInfo;
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">Order #234</h2>
        <div className="flex items-center">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
            {status}
          </span>
          <button
            onClick={() => close()}
            type="button"
            className="ml-4 text-xl text-gray-400 hover:text-gray-600"
          >
            x
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-bold">Billing details</h3>
          <p>eric manzi</p>
          <p>{billigDetails.address}</p>
          <p>
            {billigDetails.city}, {order.country}
          </p>
        </div>
        <div>
          <h3 className="font-bold">Billing details</h3>
          <p>eric manzi</p>
          <p>{billigDetails.address}</p>
          <p>
            {billigDetails.city}, {order.country}
          </p>
        </div>
        <div>
          <h3 className="font-bold">Email</h3>
          <p className="text-blue-600">eric.manzi98@gmail.com</p>
        </div>
        <div>
          <h3 className="font-bold">Phone</h3>
          <p className="text-blue-600">+250781440175</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Payment via</h3>
        <p>MTN Mobile Money</p>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border text-gray-500 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">PRICE</th>
            </tr>
          </thead>
          <tbody>
            {order.orderDetails.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-1 bg-primary text-sm text-white rounded-md"
          onClick={edit}
        >
          Edit
        </button>
        <button
          type="button"
          className="px-4 py-1 bg-red-500 text-sm text-white rounded-md"
          onClick={() => cancel(order.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function Edit({
  edit,
  order,
  status,
}: {
  edit: () => void;
  order: Order;
  status: (nstat: string) => void;
}) {
  const validStatuses = [
    'Pending',
    'Failed',
    'Canceled',
    'Paid',
    'Shipping',
    'Delivered',
    'Returned',
    'Completed',
  ];
  const dispatch = useAppDispatch();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4 text-primary">
          Edit Order Status
        </h2>
        <label htmlFor="status" className="block mb-2 text-gray-700">
          Status:
        </label>
        <select
          id="status"
          className="block w-full p-2 border border-gray-300 rounded mb-4 text-gray-700 outline-none"
        >
          {validStatuses.map((stat) => (
            <option key={stat} value={stat}>
              {stat}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-1 bg-primary text-sm text-white rounded-md"
            onClick={() => {
              edit();
              status(document.querySelector('select')?.value || 'pending');
              dispatch(
                updateOrderStatus({
                  id: order.id,
                  status: document.querySelector('select')?.value || 'pending',
                })
              );
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={edit}
            className="px-4 py-1 bg-red-500 text-sm text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailsModal({
  close,
  order,
  cancel,
}: ModalProps) {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(order.status);
  return edit ? (
    <Edit
      edit={() => setEdit(false)}
      order={order}
      status={(nstat) => setStatus(nstat)}
    />
  ) : (
    <Modal
      close={close}
      order={order}
      cancel={cancel}
      edit={() => setEdit(true)}
      status={status}
    />
  );
}
