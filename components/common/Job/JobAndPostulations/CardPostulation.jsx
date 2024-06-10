import React from "next/react";
import { format } from "date-fns";

const CardPostulation = args => {
  const { data } = args;

  const parseStatus = value => {
    switch (value) {
      case "postulated":
        return "Postulado";
      case "viewed":
        return "Revisado";
      case "accepted":
        return "Aceptado";
      case "rejected":
        return "Rechazado";
      default:
        return "";
    }
  };

  const parseLock = value => {
    switch (value) {
      case false:
        return "Desbloqueado";
      case true:
        return "Bloqueado";
      default:
        return "";
    }
  };

  function parseDate(value) {
    let date;
    if (value !== undefined) {
      const fecha = new Date(value);

      date = format(fecha, "dd/MM/yyyy");
    }
    return date;
  }
  return (
    <div className="flex justify-between max-w-[25rem] overflow-y-auto h-56 max-h-56 gap-4 p-4 text-sm border border-solid border-gray w-[25rem] rounded-xl">
      <div className="flex flex-col justify-between flex-1 gap-2">
        {/* 1 */}
        <div className="grid justify-between grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm">Nombre(s)</p>
            <p className="text-sm">
              {data?.names} {data?.lastNames}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Status</p>
            <span className="text-purple300">{parseLock(data?.locked)}</span>
          </div>
        </div>

        <div className="grid justify-between grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm">Email</p>
            <p>{data?.email || 'N/A'}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Teléfono</p>
            <p className="text-sm">{data?.phone}</p>
          </div>
        </div>

        <div className="grid justify-between grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm">Creado</p>
            <p>{parseDate(data?.createdAt)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Estado</p>
            <p>{parseStatus(data?.status)}</p>
          </div>
        </div>
        {/* 5 */}
        <div className="grid">
          <p className="text-sm">Última actualización</p>
          <p>{parseDate(data?.updateDate)}</p>
        </div>
      </div>
    </div>
  );
};

CardPostulation.defaultProps = {
  showClose: false,
  showActions: false,
  onClose() { },
  onAccept() { },
  onReject() { },
};

export default CardPostulation;
