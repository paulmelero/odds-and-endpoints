<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false, default: '' },
});
</script>

<template>
  <div
    :style="{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0e1019',
      color: '#f0f1f4',
      position: 'relative',
      overflow: 'hidden',
    }"
  >
    <!-- Top accent bar -->
    <div
      :style="{
        height: '4px',
        width: '100%',
        background: 'linear-gradient(to right, #b2521c, #eda043, #b2521c)',
        flexShrink: '0',
      }"
    />

    <!-- Main content area -->
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: '1',
        padding: '48px 72px',
      }"
    >
      <!-- Logo mark + wordmark -->
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '28px',
        }"
      >
        <div
          :style="{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            backgroundColor: '#252a3a',
            border: '1px solid rgba(102, 110, 140, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: '22px',
            color: '#eda043',
          }"
        >
          /
        </div>
        <span
          :style="{
            fontSize: '22px',
            fontWeight: '600',
            color: '#8c92a9',
            letterSpacing: '-0.02em',
          }"
        >
          woddsup
        </span>
      </div>

      <!-- Tagline pill -->
      <div
        :style="{
          border: '1px solid rgba(102, 110, 140, 0.35)',
          borderRadius: '9999px',
          padding: '6px 20px',
          marginBottom: '32px',
        }"
      >
        <span
          :style="{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#666e8c',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }"
        >
          Applied (Recreational) Maths
        </span>
      </div>

      <!-- Title -->
      <div
        :style="{
          fontSize: '52px',
          fontWeight: '800',
          color: '#f0f1f4',
          textAlign: 'center',
          lineHeight: '1.15',
          marginBottom: '20px',
          maxWidth: '900px',
        }"
      >
        {{ title }}
      </div>

      <!-- Description -->
      <div
        v-if="description"
        :style="{
          fontSize: '22px',
          color: '#8c92a9',
          textAlign: 'center',
          lineHeight: '1.5',
          maxWidth: '700px',
        }"
      >
        {{ description }}
      </div>
    </div>

    <!-- Footer -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        flexShrink: '0',
      }"
    >
      <span
        :style="{
          fontSize: '15px',
          color: '#4a5270',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
        }"
      >
        woddsup.com
      </span>
    </div>
  </div>
</template>
