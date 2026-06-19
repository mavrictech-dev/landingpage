import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Circle,
  Eraser,
  ImagePlus,
  PencilLine,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Upload,
} from "lucide-react";

const providerData = [
  { label: "PROVEEDOR", value: "MAVRIC SAC" },
  { label: "RUC", value: "20615878481" },
  { label: "DOMICILIO", value: "URB SAN EDUARDO" },
];

const importantNotes = [
  "¹ Reclamo: Disconformidad relacionada a los productos o servicios.",
  "² Queja: Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.",
];

function getTodayInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Field({
  label,
  placeholder,
  icon: Icon,
  className = "",
  as = "input",
  type = "text",
  value,
  onChange,
  readOnly = false,
}) {
  const baseClasses =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 text-[13px] text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.04)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-slate-400";

  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[12px] font-semibold tracking-[0.01em] text-slate-800">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 size-[15px] -translate-y-1/2 text-slate-400" /> : null}
        {as === "textarea" ? (
          <textarea
            rows={4}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`${baseClasses} min-h-[88px] resize-none py-3 ${Icon ? "pl-11" : ""}`}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`${baseClasses} h-10 ${Icon ? "pl-11" : ""} ${type === "date" ? "pr-3" : ""}`}
          />
        )}
      </div>
    </label>
  );
}

function SectionCard({ number, title, children }) {
  return (
    <section className="rounded-[26px] border border-[#edf1f7] bg-white/95 p-5 shadow-[0_16px_46px_rgba(148,163,184,0.12)]">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.22)]">
          {number}
        </div>
        <h2 className="text-[13px] font-bold uppercase tracking-[0.01em] text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ChoiceCard({ icon: Icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 items-center justify-between rounded-2xl border px-4 text-[13px] font-semibold transition ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-[0_8px_20px_rgba(59,130,246,0.12)]"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon className={`size-[15px] ${active ? "text-blue-600" : "text-slate-400"}`} />
        {label}
      </span>
      <span className={`flex size-4 items-center justify-center rounded-full border ${active ? "border-blue-500" : "border-slate-300"}`}>
        <span className={`size-2 rounded-full ${active ? "bg-blue-600" : "bg-transparent"}`} />
      </span>
    </button>
  );
}

function ClaimKindOption({ label, active, onClick, iconFilled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-[13px] font-semibold transition ${active ? "text-slate-900" : "text-slate-600"}`}
    >
      {iconFilled ? (
        <span className="flex size-4 items-center justify-center rounded-full border border-blue-500">
          <span className="size-2 rounded-full bg-blue-600" />
        </span>
      ) : (
        <Circle className="size-4 text-slate-300" />
      )}
      {label}
    </button>
  );
}

function SignaturePad({ onHasSignatureChange, uploadedSignature, onUploadSignature }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const drawingRef = useRef(false);
  const [mode, setMode] = useState("draw");

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const context = canvas.getContext("2d");
    const snapshot = canvas.toDataURL();
    const image = new Image();

    canvas.width = rect.width;
    canvas.height = 150;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#0f172a";

    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    if (snapshot !== "data:," && snapshot.length > 10) {
      image.src = snapshot;
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const source = event.touches?.[0] || event;
    return {
      x: source.clientX - rect.left,
      y: source.clientY - rect.top,
    };
  };

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const point = getPoint(event);

    drawingRef.current = true;
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;
    event.preventDefault();

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const point = getPoint(event);

    context.lineTo(point.x, point.y);
    context.stroke();
    onHasSignatureChange(true);
  };

  const stopDrawing = () => {
    drawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    onHasSignatureChange(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("draw")}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
              mode === "draw" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
            }`}
          >
            Firma virtual
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
              mode === "upload" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
            }`}
          >
            Subir imagen
          </button>
        </div>

        {mode === "draw" ? (
          <button
            type="button"
            onClick={clearSignature}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
          >
            <Eraser className="size-3.5" />
            Limpiar firma
          </button>
        ) : null}
      </div>

      {mode === "draw" ? (
        <div className="space-y-2">
          <div
            ref={wrapperRef}
            className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white"
          >
            <canvas
              ref={canvasRef}
              className="block h-[150px] w-full cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <p className="text-[12px] text-slate-400">Firme dentro del recuadro usando mouse, touchpad o dedo.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center transition hover:border-blue-300">
            <Upload className="size-5 text-blue-600" />
            <div>
              <p className="text-[13px] font-semibold text-slate-700">Subir imagen de firma</p>
              <p className="mt-1 text-[12px] text-slate-400">PNG o JPG en fondo blanco.</p>
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={onUploadSignature}
            />
          </label>

          {uploadedSignature ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                <ImagePlus className="size-4 text-blue-600" />
                Vista previa de la firma
              </div>
              <div className="rounded-xl bg-white p-3">
                <img src={uploadedSignature} alt="Firma del consumidor" className="max-h-28 w-auto object-contain" />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default function LibroReclamaciones() {
  const today = useMemo(() => getTodayInputValue(), []);
  const [productType, setProductType] = useState("producto");
  const [claimKind, setClaimKind] = useState("reclamo");
  const [responseDate, setResponseDate] = useState(today);
  const [sheetDate, setSheetDate] = useState(today);
  const [consumerSignatureImage, setConsumerSignatureImage] = useState("");
  const [consumerHasDrawnSignature, setConsumerHasDrawnSignature] = useState(false);

  const consumerSignatureReady = consumerHasDrawnSignature || Boolean(consumerSignatureImage);

  const handleSignatureUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setConsumerSignatureImage(String(reader.result || ""));
      setConsumerHasDrawnSignature(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="relative overflow-hidden bg-[#f4f7fc] px-4 py-4 text-slate-900 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.88),transparent_30%),linear-gradient(180deg,#f7f9fe_0%,#eef4ff_100%)]" />
      <div className="absolute left-[-120px] top-[-60px] h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute bottom-10 right-[-80px] h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1180px] rounded-[32px] border border-white/70 bg-white/60 p-4 shadow-[0_30px_100px_rgba(148,163,184,0.18)] backdrop-blur-xl sm:p-5 lg:p-6">
        <div className="absolute inset-x-0 top-0 h-32 rounded-t-[32px] bg-[linear-gradient(135deg,rgba(59,130,246,0.06),transparent_40%,rgba(255,255,255,0.55))]" />

        <header className="relative flex flex-col gap-4 pb-5 pt-1">
          <div className="mx-auto flex size-[66px] items-center justify-center rounded-[22px] border border-white/80 bg-white/90 shadow-[0_16px_36px_rgba(37,99,235,0.1)]">
            <AlertCircle className="size-8 text-blue-600" strokeWidth={1.8} />
          </div>

          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 sm:text-[12px]">Libro de reclamaciones</p>
            <h1 className="mt-2 text-[28px] font-black tracking-[-0.045em] text-slate-900 sm:text-[38px] md:text-[46px] lg:text-[54px]">
              Hoja de Reclamación Virtual
            </h1>
            <p className="mt-2 text-[13px] text-slate-500 sm:text-[14px] md:text-[15px]">
              Complete el siguiente formulario para registrar su reclamo o queja.
            </p>
          </div>

          <div className="flex justify-end pt-1">
            <div className="w-full max-w-[260px]">
              <Field
                label="Fecha"
                icon={CalendarDays}
                type="date"
                value={sheetDate}
                onChange={(event) => setSheetDate(event.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <SectionCard number="1" title="Identificación del consumidor reclamante">
            <div className="grid gap-4 md:grid-cols-12">
              <Field className="md:col-span-6" label="Nombre completo *" placeholder="Ingrese su nombre completo" />
              <Field className="md:col-span-3" label="DNI / CE *" placeholder="Ingrese su DNI o CE" />
              <Field className="md:col-span-3" label="Correo electrónico" placeholder="ejemplo@correo.com" />
              <Field className="md:col-span-9" label="Domicilio *" placeholder="Ingrese su domicilio completo" />
              <Field className="md:col-span-3" label="Teléfono *" placeholder="Ingrese su número" icon={Phone} />
              <Field
                className="md:col-span-12"
                label="Si es menor de edad, nombre del padre, madre o apoderado"
                placeholder="Ingrese nombre completo (opcional)"
              />
            </div>
          </SectionCard>

          <SectionCard number="2" title="Identificación del bien contratado">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-6">
                <span className="mb-2 block text-[12px] font-semibold tracking-[0.01em] text-slate-800">Tipo *</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ChoiceCard
                    icon={ShoppingBag}
                    label="Producto"
                    active={productType === "producto"}
                    onClick={() => setProductType("producto")}
                  />
                  <ChoiceCard
                    icon={BriefcaseBusiness}
                    label="Servicio"
                    active={productType === "servicio"}
                    onClick={() => setProductType("servicio")}
                  />
                </div>
              </div>

              <div className="md:col-span-6">
                <label className="flex flex-col gap-2">
                  <span className="text-[12px] font-semibold tracking-[0.01em] text-slate-800">Monto reclamado (S/.)</span>
                  <div className="flex h-10 items-center rounded-2xl border border-slate-200 bg-white px-4 text-[13px] text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                    <span className="mr-4 text-[14px] font-semibold text-slate-900">S/.</span>
                    <input type="text" defaultValue="0.00" className="w-full bg-transparent outline-none placeholder:text-slate-400" />
                  </div>
                </label>
              </div>

              <Field
                className="md:col-span-12"
                label="Descripción *"
                placeholder="Describa el producto o servicio contratado"
                as="textarea"
              />
            </div>
          </SectionCard>

          <SectionCard number="3" title="Detalle de la reclamación y pedido del consumidor">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-5 text-[13px] font-semibold text-slate-700">
                <ClaimKindOption
                  label="Reclamo¹"
                  active={claimKind === "reclamo"}
                  iconFilled={claimKind === "reclamo"}
                  onClick={() => setClaimKind("reclamo")}
                />
                <span className="hidden text-slate-300 sm:block">|</span>
                <ClaimKindOption
                  label="Queja²"
                  active={claimKind === "queja"}
                  iconFilled={claimKind === "queja"}
                  onClick={() => setClaimKind("queja")}
                />
              </div>

              <div className="grid gap-4">
                <Field label="Detalle *" placeholder="Describa su reclamo o queja con el mayor detalle posible" as="textarea" />
                <Field label="Pedido *" placeholder="Indique su pedido o solución esperada" as="textarea" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-800">
                    <PencilLine className="size-4 text-slate-500" />
                    Firma del consumidor (opcional)
                  </div>
                  <SignaturePad
                    uploadedSignature={consumerSignatureImage}
                    onUploadSignature={handleSignatureUpload}
                    onHasSignatureChange={setConsumerHasDrawnSignature}
                  />
                  <p className="text-[12px] text-slate-400">
                    Estado de firma: {consumerSignatureReady ? "firma cargada o registrada" : "sin firma todavía"}.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard number="4" title="Observaciones y acciones adoptadas por el proveedor">
            <div className="grid gap-4 md:grid-cols-12">
              <Field
                className="md:col-span-4"
                label="Fecha de comunicación de la respuesta"
                icon={CalendarDays}
                type="date"
                value={responseDate}
                onChange={(event) => setResponseDate(event.target.value)}
              />
              <Field
                className="md:col-span-8"
                label="Observaciones y acciones adoptadas"
                placeholder="Detalle las acciones y respuesta brindada al consumidor"
                as="textarea"
              />
              <div className="md:col-span-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-500 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                Firma del proveedor (opcional)
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section className="rounded-[26px] border border-white/80 bg-white/90 p-5 shadow-[0_16px_46px_rgba(148,163,184,0.12)]">
            <div className="flex items-start gap-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Building2 className="size-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-[22px] font-bold tracking-[-0.03em] text-slate-900">Datos del proveedor</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {providerData.map((item) => (
                    <div key={item.label}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">{item.label}</p>
                      <p className="mt-2 text-[15px] font-bold text-slate-900 sm:text-[16px]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[26px] border border-white/80 bg-white/90 p-5 shadow-[0_16px_46px_rgba(148,163,184,0.12)]">
            <div className="flex items-center gap-3 text-blue-700">
              <AlertCircle className="size-[18px]" />
              <h3 className="text-[20px] font-bold tracking-[-0.03em]">Notas importantes</h3>
            </div>
            <ul className="mt-4 space-y-2 pl-5 text-[13px] leading-7 text-slate-600 marker:text-blue-600">
              {importantNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-4 rounded-[26px] border border-white/80 bg-white/90 px-5 py-4 shadow-[0_16px_46px_rgba(148,163,184,0.12)]">
          <div className="flex items-start gap-4 text-[13px] leading-7 text-slate-600">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <ShieldCheck className="size-6" />
            </div>
            <p>
              La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI. El proveedor debe dar respuesta al reclamo o queja en un plazo no mayor a <span className="font-bold text-blue-700">quince (15) días hábiles</span>, el cual es improrrogable.
            </p>
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#1d4ed8,#2563eb_50%,#3b82f6)] px-8 text-[15px] font-bold text-white shadow-[0_18px_36px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(37,99,235,0.34)] focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <Send className="size-[18px]" />
            Enviar reclamación
          </button>
        </div>
      </div>
    </section>
  );
}
