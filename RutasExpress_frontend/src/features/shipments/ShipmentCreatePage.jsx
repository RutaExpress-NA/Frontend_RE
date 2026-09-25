import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { ChevronLeftIcon } from "../../ui/Icons";
import { createShipment } from "../../services/shipmentsService";
import { getCatalog } from "../../services/catalogService";

const EMPTY_FORM = {
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    weightKg: "",
    serviceId: "",
};

export function ShipmentCreatePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [form, setForm] = useState(EMPTY_FORM);
    const [services, setServices] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCatalog().then((data) => setServices(data.filter((s) => s.active)));
    }, []);

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function isValid() {
        return (
            form.recipientName.trim() !== "" &&
            form.recipientAddress.trim() !== "" &&
            form.weightKg !== "" &&
            Number(form.weightKg) > 0 &&
            form.serviceId !== ""
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!isValid()) {
            setError("Completa todos los campos requeridos.");
            return;
        }
        setError(null);
        setIsSubmitting(true);

        try {
            const payload = {
                recipient: {
                    name: form.recipientName,
                    email: form.recipientEmail,
                    phone: form.recipientPhone,
                    address: form.recipientAddress,
                },
                weightKg: Number(form.weightKg),
                serviceId: form.serviceId,
            };
            const created = await createShipment(payload, user.id);
            navigate(`/shipments/${created.id}`);
        } catch (err) {
            console.error(err);
            setError("No se pudo crear el envío. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="rex-shipment-detail">
            <header className="rex-shipment-detail__header">
                <button
                    type="button"
                    className="rex-shipment-detail__back"
                    onClick={() => navigate("/shipments")}
                >
                    <ChevronLeftIcon size={16} /> Envíos
                </button>
                <span className="rex-shipment-detail__separator">·</span>
                <h1 className="rex-shipment-detail__code">Nuevo envío</h1>
            </header>

            <Card padding="lg">
                <form onSubmit={handleSubmit} className="rex-form">
                    <h2 className="rex-panel__title">Destinatario</h2>

                    <div className="rex-form__field">
                        <label htmlFor="recipientName">Nombre *</label>
                        <input
                            id="recipientName"
                            type="text"
                            value={form.recipientName}
                            onChange={(e) => updateField("recipientName", e.target.value)}
                        />
                    </div>

                    <div className="rex-form__row">
                        <div className="rex-form__field">
                            <label htmlFor="recipientEmail">Email</label>
                            <input
                                id="recipientEmail"
                                type="email"
                                value={form.recipientEmail}
                                onChange={(e) => updateField("recipientEmail", e.target.value)}
                            />
                        </div>
                        <div className="rex-form__field">
                            <label htmlFor="recipientPhone">Teléfono</label>
                            <input
                                id="recipientPhone"
                                type="tel"
                                value={form.recipientPhone}
                                onChange={(e) => updateField("recipientPhone", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rex-form__field">
                        <label htmlFor="recipientAddress">Dirección *</label>
                        <input
                            id="recipientAddress"
                            type="text"
                            value={form.recipientAddress}
                            onChange={(e) => updateField("recipientAddress", e.target.value)}
                        />
                    </div>

                    <h2 className="rex-panel__title rex-form__section-title">Detalles del paquete</h2>

                    <div className="rex-form__row">
                        <div className="rex-form__field">
                            <label htmlFor="weightKg">Peso (kg) *</label>
                            <input
                                id="weightKg"
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={form.weightKg}
                                onChange={(e) => updateField("weightKg", e.target.value)}
                            />
                        </div>
                        <div className="rex-form__field">
                            <label htmlFor="serviceId">Servicio *</label>
                            <select
                                id="serviceId"
                                value={form.serviceId}
                                onChange={(e) => updateField("serviceId", e.target.value)}
                            >
                                <option value="">Selecciona un servicio...</option>
                                {services.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} — ${s.price.toLocaleString("es-CL")}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {error && <p className="rex-form__error">{error}</p>}

                    <div className="rex-form__actions">
                        <Button variant="ghost" type="button" onClick={() => navigate("/shipments")}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creando..." : "Crear envío"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}