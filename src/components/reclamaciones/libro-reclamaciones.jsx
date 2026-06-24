import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Circle,
  Eraser,
  LoaderCircle,
  PencilLine,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Upload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const GAS_ENDPOINT = import.meta.env.VITE_RECLAMACIONES_GAS_URL || "";

const providerData = [
  { label: "PROVEEDOR", value: "MAVRIC SAC" },
  { label: "RUC", value: "20615878481" },
  { label: "DOMICILIO", value: "URB SAN EDUARDO" },
];

const importantNotes = [
  "¹ Reclamo: Disconformidad relacionada a los productos o servicios.",
  "² Queja: Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.",
];

const initialStatus = {
  type: "idle",
  message: "",
  complaintNumber: "",
};

function getTodayInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildInitialForm(today) {
  return {
    sheetDate: today,
    fullName: "",
    documentNumber: "",
    email: "",
    address: "",
    phone: "",
    guardianName: "",
    claimedAmount: "0.00",
    description: "",
    detail: "",
    request: "",
  };
}

function formatDateLabel(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function validateForm(form, productType, claimKind, signatureDataUrl) {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = "Ingresá el nombre completo.";
  if (!form.documentNumber.trim()) errors.documentNumber = "Ingresá el DNI o CE.";
  if (!form.address.trim()) errors.address = "Ingresá el domicilio.";
  if (!form.phone.trim()) errors.phone = "Ingresá el teléfono.";
  if (!form.email.trim()) {
    errors.email = "Ingresá el correo electrónico.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Ingresá un correo válido.";
  }
  if (!form.description.trim()) errors.description = "Describí el producto o servicio.";
  if (!form.detail.trim()) errors.detail = "Completá el detalle del reclamo o queja.";
  if (!form.request.trim()) errors.request = "Completá el pedido del consumidor.";
  if (!productType) errors.productType = "Elegí producto o servicio.";
  if (!claimKind) errors.claimKind = "Elegí reclamo o queja.";
  if (!signatureDataUrl) errors.signature = "La firma del consumidor es obligatoria para enviar el reclamo.";

  return errors;
}

async function submitComplaint(payload) {
  if (!GAS_ENDPOINT) {
    throw new Error("Falta configurar VITE_RECLAMACIONES_GAS_URL.");
  }

  const response = await fetch(GAS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let data;

  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    throw new Error("La respuesta del servicio no es JSON válido.");
  }

  if (!response.ok || data?.ok === false) {
    throw new Error(data?.error || "No se pudo registrar el reclamo.");
  }

  return data;
}

function Field({
  label,
  name,
  placeholder,
  icon: Icon,
  className = "",
  as = "input",
  type = "text",
  value,
  onChange,
  readOnly = false,
  error = "",
  disabled = false,
}) {
  const baseClasses =
    "w-full rounded-2xl border bg-white px-4 text-[13px] text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.04)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50";

  const borderClass = error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100" : "border-slate-200";

  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[12px] font-semibold tracking-[0.01em] text-slate-800">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 size-[15px] -translate-y-1/2 text-slate-400" /> : null}
        {as === "textarea" ? (
          <textarea
            name={name}
            rows={4}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
            className={`${baseClasses} ${borderClass} min-h-[88px] resize-none py-3 ${Icon ? "pl-11" : ""}`}
          />
        ) : (
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
            className={`${baseClasses} ${borderClass} h-10 ${Icon ? "pl-11" : ""} ${type === "date" ? "pr-3" : ""}`}
          />
        )}
      </div>
      {error ? <span className="text-[12px] font-medium text-rose-600">{error}</span> : null}
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

function ClaimKindOption({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-[13px] font-semibold transition ${active ? "text-slate-900" : "text-slate-600"}`}
    >
      {active ? (
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

function SignaturePad({ uploadedSignature, onSignatureChange, error = "" }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const drawingRef = useRef(false);
  const [mode, setMode] = useState("draw");

  const commitCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snapshot = canvas.toDataURL("image/png");
    onSignatureChange(snapshot === "data:," ? "" : snapshot);
  };

  const resetCanvasBackground = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#0f172a";
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const snapshot = canvas.toDataURL("image/png");
    const rect = wrapper.getBoundingClientRect();
    const image = new Image();

    canvas.width = rect.width;
    canvas.height = 150;
    resetCanvasBackground();

    if (snapshot !== "data:," && snapshot.length > 20) {
      image.onload = () => {
        const context = canvas.getContext("2d");
        context?.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
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
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const point = getPoint(event);

    drawingRef.current = true;
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const point = getPoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    commitCanvasImage();
  };

  const clearSignature = () => {
    resetCanvasBackground();
    onSignatureChange("");
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onSignatureChange(String(reader.result || ""));
      setMode("upload");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] ${error ? "border-rose-300" : "border-slate-200"}`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("draw")}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${mode === "draw" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            Firma virtual
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${mode === "upload" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            Subir imagen
          </button>
        </div>

        <button
          type="button"
          onClick={clearSignature}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
        >
          <Eraser className="size-3.5" />
          Limpiar
        </button>
      </div>

      {mode === "draw" ? (
        <div className="space-y-2">
          <div ref={wrapperRef} className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white">
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
            <input type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={handleUpload} />
          </label>
          {uploadedSignature ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="rounded-xl bg-white p-3">
                <img src={uploadedSignature} alt="Firma del consumidor" className="max-h-28 w-auto object-contain" />
              </div>
            </div>
          ) : null}
        </div>
      )}

      {error ? <p className="mt-3 text-[12px] font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}

export default function LibroReclamaciones() {
  const navigate = useNavigate();
  const today = useMemo(() => getTodayInputValue(), []);
  const [form, setForm] = useState(() => buildInitialForm(today));
  const [productType, setProductType] = useState("producto");
  const [claimKind, setClaimKind] = useState("reclamo");
  const [consumerSignatureImage, setConsumerSignatureImage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form, productType, claimKind, consumerSignatureImage);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({
        type: "error",
        message: "Revisá los campos marcados antes de enviar.",
        complaintNumber: "",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatus(initialStatus);

    const payload = {
      submittedAt: new Date().toISOString(),
      formDate: form.sheetDate,
      formDateDisplay: formatDateLabel(form.sheetDate),
      fullName: form.fullName.trim(),
      documentNumber: form.documentNumber.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      guardianName: form.guardianName.trim(),
      productType,
      claimKind,
      claimedAmount: form.claimedAmount.trim() || "0.00",
      description: form.description.trim(),
      detail: form.detail.trim(),
      request: form.request.trim(),
      consumerSignatureDataUrl: consumerSignatureImage,
      providerResponseDate: "",
      providerSolution: "",
      providerSignature: "",
    };

    try {
      const result = await submitComplaint(payload);
      setStatus({
        type: "success",
        message: "Reclamo enviado. La empresa se pondrá en contacto con vos y también enviamos una copia al correo registrado.",
        complaintNumber: result?.complaintNumber || "",
      });
      setForm(buildInitialForm(today));
      setProductType("producto");
      setClaimKind("reclamo");
      setConsumerSignatureImage("");
      setErrors({});
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Ocurrió un error al enviar el reclamo.",
        complaintNumber: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f4f7fc] px-4 py-4 text-slate-900 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.88),transparent_30%),linear-gradient(180deg,#f7f9fe_0%,#eef4ff_100%)]" />
      <div className="absolute left-[-120px] top-[-60px] h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute bottom-10 right-[-80px] h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1180px] rounded-[32px] border border-white/70 bg-white/60 p-4 shadow-[0_30px_100px_rgba(148,163,184,0.18)] backdrop-blur-xl sm:p-5 lg:p-6">
        <div className="absolute inset-x-0 top-0 h-32 rounded-t-[32px] bg-[linear-gradient(135deg,rgba(59,130,246,0.06),transparent_40%,rgba(255,255,255,0.55))]" />

        {status.type === "success" ? (
          <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-10 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-[0_16px_40px_rgba(16,185,129,0.18)]">
              <ShieldCheck className="size-10" />
            </div>

            <div className="mt-6 max-w-2xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-emerald-700">Envío completado</p>
              <h1 className="mt-3 text-[30px] font-black tracking-[-0.04em] text-slate-900 sm:text-[38px] md:text-[44px]">
                Reclamo enviado correctamente
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                La empresa se pondrá en contacto con vos a la brevedad. También enviamos una copia del reclamo al correo electrónico registrado.
              </p>
              {status.complaintNumber ? (
                <div className="mt-6 inline-flex rounded-full border border-emerald-200 bg-white px-5 py-2 text-[14px] font-semibold text-emerald-700 shadow-[0_10px_24px_rgba(16,185,129,0.12)]">
                  Código de reclamo: {status.complaintNumber}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1d4ed8,#2563eb_50%,#3b82f6)] px-8 text-[15px] font-bold text-white shadow-[0_18px_36px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(37,99,235,0.34)] focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Salir
            </button>
          </div>
        ) : (
        <>
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
                name="sheetDate"
                icon={CalendarDays}
                type="date"
                value={form.sheetDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <SectionCard number="1" title="Identificación del consumidor reclamante">
            <div className="grid gap-4 md:grid-cols-12">
              <Field className="md:col-span-6" label="Nombre completo *" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="Ingrese su nombre completo" />
              <Field className="md:col-span-3" label="DNI / CE *" name="documentNumber" value={form.documentNumber} onChange={handleChange} error={errors.documentNumber} placeholder="Ingrese su DNI o CE" />
              <Field className="md:col-span-3" label="Correo electrónico *" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="ejemplo@correo.com" />
              <Field className="md:col-span-9" label="Domicilio *" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="Ingrese su domicilio completo" />
              <Field className="md:col-span-3" label="Teléfono *" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="Ingrese su número" icon={Phone} />
              <Field className="md:col-span-12" label="Si es menor de edad, nombre del padre, madre o apoderado" name="guardianName" value={form.guardianName} onChange={handleChange} placeholder="Ingrese nombre completo (opcional)" />
            </div>
          </SectionCard>

          <SectionCard number="2" title="Identificación del bien contratado">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-6">
                <span className="mb-2 block text-[12px] font-semibold tracking-[0.01em] text-slate-800">Tipo *</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ChoiceCard icon={ShoppingBag} label="Producto" active={productType === "producto"} onClick={() => setProductType("producto")} />
                  <ChoiceCard icon={BriefcaseBusiness} label="Servicio" active={productType === "servicio"} onClick={() => setProductType("servicio")} />
                </div>
                {errors.productType ? <p className="mt-2 text-[12px] font-medium text-rose-600">{errors.productType}</p> : null}
              </div>

              <div className="md:col-span-6">
                <Field
                  label="Monto reclamado (S/.)"
                  name="claimedAmount"
                  value={form.claimedAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>

              <Field className="md:col-span-12" label="Descripción *" name="description" value={form.description} onChange={handleChange} error={errors.description} placeholder="Describa el producto o servicio contratado" as="textarea" />
            </div>
          </SectionCard>

          <SectionCard number="3" title="Detalle de la reclamación y pedido del consumidor">
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-5 text-[13px] font-semibold text-slate-700">
                  <ClaimKindOption label="Reclamo¹" active={claimKind === "reclamo"} onClick={() => setClaimKind("reclamo")} />
                  <span className="hidden text-slate-300 sm:block">|</span>
                  <ClaimKindOption label="Queja²" active={claimKind === "queja"} onClick={() => setClaimKind("queja")} />
                </div>
                {errors.claimKind ? <p className="mt-2 text-[12px] font-medium text-rose-600">{errors.claimKind}</p> : null}
              </div>

              <div className="grid gap-4">
                <Field label="Detalle *" name="detail" value={form.detail} onChange={handleChange} error={errors.detail} placeholder="Describa su reclamo o queja con el mayor detalle posible" as="textarea" />
                <Field label="Pedido *" name="request" value={form.request} onChange={handleChange} error={errors.request} placeholder="Indique su pedido o solución esperada" as="textarea" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-800">
                    <PencilLine className="size-4 text-slate-500" />
                    Firma del consumidor *
                  </div>
                  <SignaturePad uploadedSignature={consumerSignatureImage} onSignatureChange={(value) => {
                    setConsumerSignatureImage(value);
                    setErrors((current) => ({ ...current, signature: "" }));
                  }} error={errors.signature} />
                </div>
              </div>
            </div>
          </SectionCard>
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

          {status.type !== "idle" ? (
            <div className={`rounded-[22px] border px-4 py-3 text-[13px] ${status.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
              <p className="font-semibold">{status.message}</p>
              {status.complaintNumber ? <p className="mt-1">Código generado: <span className="font-bold">{status.complaintNumber}</span></p> : null}
            </div>
          ) : null}

          <div className="mt-7 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#1d4ed8,#2563eb_50%,#3b82f6)] px-8 text-[15px] font-bold text-white shadow-[0_18px_36px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(37,99,235,0.34)] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? <LoaderCircle className="size-[18px] animate-spin" /> : <Send className="size-[18px]" />}
              {isSubmitting ? "Enviando reclamo..." : "Enviar reclamación"}
            </button>
          </div>
        </form>
        </>
        )}
      </div>
    </section>
  );
}
