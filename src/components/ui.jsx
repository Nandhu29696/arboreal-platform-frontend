import React, { forwardRef } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// ── Card ──────────────────────────────────────────────────────
export function Card({ children, style, className }) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        ...style
      }}
    >
      {children}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  icon: Icon,
  color = 'var(--accent)',
  sub
}) {
  return (
    <Card
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          flexShrink: 0,
          background: `${color}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon size={20} color={color} />
      </div>

      <div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginBottom: 2,
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1
          }}
        >
          {value ?? '—'}
        </div>

        {sub && (
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginTop: 4
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </Card>
  );
}

// ── Button ────────────────────────────────────────────────────
export function Btn({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  type = 'button',
  style
}) {
  const sizes = {
    sm: '0.42rem 0.85rem',
    md: '0.55rem 1.15rem',
    lg: '0.75rem 1.5rem'
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    border: '1px solid transparent',
    borderRadius: 8,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize:
      size === 'sm'
        ? '0.78rem'
        : size === 'lg'
          ? '0.95rem'
          : '0.85rem',
    padding: sizes[size],
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    transition: 'all 0.15s',
    ...style
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-inverse)',
      borderColor: 'var(--accent)'
    },

    secondary: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      borderColor: 'var(--border)'
    },

    danger: {
      background: 'rgba(248,113,113,0.1)',
      color: 'var(--danger)',
      borderColor: 'rgba(248,113,113,0.3)'
    },

    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      borderColor: 'transparent'
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...base,
        ...variants[variant]
      }}
    >
      {children}
    </button>
  );
}

// ── Modal ─────────────────────────────────────────────────────
export function Modal({
  open,
  onClose,
  title,
  children,
  width = 560
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: width,
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border)'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: 'var(--text-primary)'
            }}
          >
            {title}
          </h3>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            overflowY: 'auto',
            padding: '1.25rem',
            flex: 1
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Form Row ──────────────────────────────────────────────────
export function FormRow({ children, cols = 2 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '0.85rem',
        marginBottom: '0.85rem'
      }}
    >
      {children}
    </div>
  );
}

// ── Field ─────────────────────────────────────────────────────
export function Field({ label, children, required }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          marginBottom: '0.35rem',
          fontFamily: 'var(--font-display)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        {label}

        {required && (
          <span
            style={{
              color: 'var(--danger)',
              marginLeft: 2
            }}
          >
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

// ── SelectField (FIXED WITH forwardRef) ───────────────────────
export const SelectField = forwardRef(
  (
    {
      options = [],
      placeholder,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        {...props}
        style={{
          width: '100%',
          padding: '0.7rem 0.85rem',
          borderRadius: 8,
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          outline: 'none',
          ...style
        }}
      >
        <option value="">
          {placeholder || '— Select —'}
        </option>

        {options.map((o, index) => {
          const value = o?.value ?? o;
          const label = o?.label ?? o;

          return (
            <option
              key={`${value}-${index}`}
              value={value}
            >
              {label}
            </option>
          );
        })}
      </select>
    );
  }
);

SelectField.displayName = 'SelectField';

// ── Pagination ────────────────────────────────────────────────
export function Pagination({
  page,
  total,
  limit,
  onPage
}) {
  const pages = Math.ceil(total / limit);

  if (pages <= 1) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        justifyContent: 'flex-end',
        marginTop: '1rem'
      }}
    >
      <span
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}
      >
        {(page - 1) * limit + 1}–
        {Math.min(page * limit, total)} of {total}
      </span>

      <Btn
        variant="secondary"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        <ChevronLeft size={14} />
      </Btn>

      <Btn
        variant="secondary"
        size="sm"
        disabled={page >= pages}
        onClick={() => onPage(page + 1)}
      >
        <ChevronRight size={14} />
      </Btn>
    </div>
  );
}

// ── Loading ───────────────────────────────────────────────────
export function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        color: 'var(--text-muted)'
      }}
    >
      <Loader2
        size={28}
        style={{
          animation: 'spin 1s linear infinite'
        }}
      />

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

// ── Empty ─────────────────────────────────────────────────────
export function Empty({
  message = 'No records found'
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3rem',
        color: 'var(--text-muted)'
      }}
    >
      <div
        style={{
          fontSize: '2.5rem',
          marginBottom: '0.5rem'
        }}
      >
        🌱
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)'
        }}
      >
        {message}
      </div>
    </div>
  );
}

// ── Page Header ───────────────────────────────────────────────
export function PageHeader({
  title,
  subtitle,
  action
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--text-primary)',
            marginBottom: 2
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem'
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}