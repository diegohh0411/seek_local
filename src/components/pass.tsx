import { useState, useEffect } from "react";
import { Property } from "./Property";
import JsBarcode from "jsbarcode";

interface ConferencePassProps {
  nombre: string;
  apellidos: string;
  estado_del_registro: string;
  class_dot: string;
  class_nametag: string;
  regno: string;
}

interface Props {
  regno: string;
}

export const ConferencePass: React.FC<Props> = ({ regno }) => {
  const [data, setData] = useState<ConferencePassProps>({
    nombre: "Error",
    apellidos: "No existe",
    estado_del_registro: "HTTP code 404",
    class_dot: "bg-red-400",
    class_nametag: "!bg-red-950 border-red-800",
    regno: "",
  });

  const [hasRetrieved, setHasRetrieved] = useState<"success" | "error" | "pending">("pending");
  useEffect(() => {
    if (hasRetrieved === "success") {
      JsBarcode(
        "#barcode", // @ts-ignore
        {},
        { background: "#000", lineColor: "rgb(245, 245, 244)" },
      ).init();
    }
  }, [hasRetrieved]);

  const fetchData = async () => {
    const response = await fetch("/api/b", {
      method: "POST",
      body: JSON.stringify({ regno: regno }),
    });

    if (response.status === 200) {
      const rdata = await response.json();

      let class_dot = "bg-red-400";
      let class_nametag = "border-red-800";
      switch (rdata.estado_del_registro) {
        case "Esperando pago":
          class_dot = "bg-gray-200";
          class_nametag = "border-gray-800";
          break;
        case "Pagado parcialmente":
          class_dot = "bg-yellow-400";
          class_nametag = "border-yellow-800";
          break;
        case "Pagado completamente":
          class_dot = "bg-green-400";
          class_nametag = "border-green-800";
          break;
      }

      setData({
        ...rdata,
        class_dot,
        class_nametag,
      });
      setHasRetrieved("success");
    } else {
      setHasRetrieved("error");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (hasRetrieved === "pending") {
    return (
      <div className="w-full max-w-96 mx-auto aspect-[3/4] bg-stone-800 animate-pulse rounded-xl"></div>
    )
  }

  if (hasRetrieved === "success" || hasRetrieved === "error") {
    return (<div
      data-boleto
      className={`
      flex flex-col gap-4
      border-2 border-stone-800 rounded-xl p-4
      w-full max-w-96 mx-auto
      font-mono
    `}
    >
      <div className="w-full">
        <p>Pase de Conferencia</p>
        <p className="text-xs opacity-50">SEEK Local en Monterrey, 2025</p>
      </div>

      <div
        className={`flex flex-col gap-2 items-center w-full rounded p-4 bg-stone-800 border-[1px] ${data.class_nametag}`}
      >
        <div className="w-full">
          <h3 className="font-mono">{data.nombre}</h3>

          <p>{data.apellidos}</p>
        </div>

        <div className="flex gap-2 w-full items-center">
          <div className={`size-3 rounded-full animate-ping ${data.class_dot}`}>
          </div>
          <p className="text-xs opacity-50">{data.estado_del_registro}</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-[auto_1fr] text-xs gap-2">
        <Property name="Ubicación" value="Edificio ESTOA, Universidad de Monterrey" />

        <Property name="Fecha" value="7 - 9 de marzo, 2025" />
      </div>

      <hr className="border-stone-600 border-dashed border-[1px]" />

      <div className="flex flex-col items-center gap-2">
        <svg
          id="barcode"
          jsbarcode-format="CODE128"
          jsbarcode-value={"REGNO:" + data.regno.toUpperCase()} className="w-full"></svg>
      </div>
    </div>)
  }
}