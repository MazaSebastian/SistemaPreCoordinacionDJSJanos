// protectFlows.js - Script de protección para flujos de eventos
const fs = require('fs');
const path = require('path');

// Rutas de los flujos
const XV_FLOW_PATH = path.join(__dirname, 'XVAñosFlow.jsx');
const BODA_FLOW_PATH = path.join(__dirname, 'BodaFlow.jsx');

// Rutas de versiones estables
const XV_STABLE_PATH = path.join(__dirname, 'versions', 'XVAñosFlow_v1.0_STABLE.jsx');
const BODA_STABLE_PATH = path.join(__dirname, 'versions', 'BodaFlow_v1.0_STABLE.jsx');

// Rutas de backups
const XV_BACKUP_PATH = path.join(__dirname, 'XVAñosFlow_BACKUP.jsx');
const BODA_BACKUP_PATH = path.join(__dirname, 'BodaFlow_BACKUP.jsx');

function verifyFlowIntegrity(flowName, flowPath, stablePath) {
  console.log(`Verificando integridad del flujo de ${flowName}...`);
  
  if (!fs.existsSync(flowPath)) {
    console.error(`Error: ${flowName} no encontrado en ${flowPath}`);
    return false;
  }
  
  if (!fs.existsSync(stablePath)) {
    console.warn(`Advertencia: Versión estable de ${flowName} no encontrada. Se recomienda crear una.`);
    return true;
  }
  
  console.log(`Integridad básica de ${flowName} verificada.`);
  return true;
}

function createFlowCheckpoint(flowName, flowPath, versionName = `v${Date.now()}`) {
  console.log(`Creando checkpoint para ${flowName}: ${versionName}...`);
  const newCheckpointPath = path.join(__dirname, 'versions', `${flowName}_${versionName}.jsx`);
  
  try {
    fs.copyFileSync(flowPath, newCheckpointPath);
    console.log(`Checkpoint de ${flowName} creado exitosamente en: ${newCheckpointPath}`);
    return true;
  } catch (error) {
    console.error(`Error al crear checkpoint de ${flowName}:`, error);
    return false;
  }
}

function restoreStableVersion(flowName, flowPath, stablePath) {
  console.log(`Restaurando la versión estable de ${flowName}...`);
  
  if (!fs.existsSync(stablePath)) {
    console.error(`Error: No se encontró la versión estable de ${flowName} para restaurar.`);
    return false;
  }
  
  try {
    fs.copyFileSync(stablePath, flowPath);
    console.log(`Versión estable de ${flowName} restaurada exitosamente.`);
    return true;
  } catch (error) {
    console.error(`Error al restaurar la versión estable de ${flowName}:`, error);
    return false;
  }
}

function protectAllFlows() {
  console.log('🛡️  Iniciando protección de todos los flujos...\n');
  
  // Verificar integridad de XV Años
  const xvIntegrity = verifyFlowIntegrity('XV Años', XV_FLOW_PATH, XV_STABLE_PATH);
  
  // Verificar integridad de Bodas
  const bodaIntegrity = verifyFlowIntegrity('Bodas', BODA_FLOW_PATH, BODA_STABLE_PATH);
  
  console.log('\n📊 Resumen de verificación:');
  console.log(`- XV Años: ${xvIntegrity ? '✅ OK' : '❌ ERROR'}`);
  console.log(`- Bodas: ${bodaIntegrity ? '✅ OK' : '❌ ERROR'}`);
  
  if (xvIntegrity && bodaIntegrity) {
    console.log('\n🎉 Todos los flujos están protegidos y listos para desarrollo!');
    return true;
  } else {
    console.log('\n⚠️  Algunos flujos requieren atención antes de continuar.');
    return false;
  }
}

function createAllCheckpoints(versionName) {
  console.log('💾 Creando checkpoints de todos los flujos...\n');
  
  const xvCheckpoint = createFlowCheckpoint('XVAñosFlow', XV_FLOW_PATH, versionName);
  const bodaCheckpoint = createFlowCheckpoint('BodaFlow', BODA_FLOW_PATH, versionName);
  
  console.log('\n📊 Resumen de checkpoints:');
  console.log(`- XV Años: ${xvCheckpoint ? '✅ Creado' : '❌ Error'}`);
  console.log(`- Bodas: ${bodaCheckpoint ? '✅ Creado' : '❌ Error'}`);
  
  return xvCheckpoint && bodaCheckpoint;
}

function restoreAllStableVersions() {
  console.log('🔄 Restaurando todas las versiones estables...\n');
  
  const xvRestore = restoreStableVersion('XV Años', XV_FLOW_PATH, XV_STABLE_PATH);
  const bodaRestore = restoreStableVersion('Bodas', BODA_FLOW_PATH, BODA_STABLE_PATH);
  
  console.log('\n📊 Resumen de restauración:');
  console.log(`- XV Años: ${xvRestore ? '✅ Restaurado' : '❌ Error'}`);
  console.log(`- Bodas: ${bodaRestore ? '✅ Restaurado' : '❌ Error'}`);
  
  return xvRestore && bodaRestore;
}

// Funciones individuales para cada flujo
function protectXVFlow() {
  return verifyFlowIntegrity('XV Años', XV_FLOW_PATH, XV_STABLE_PATH);
}

function protectBodaFlow() {
  return verifyFlowIntegrity('Bodas', BODA_FLOW_PATH, BODA_STABLE_PATH);
}

function createXVCheckpoint(versionName) {
  return createFlowCheckpoint('XVAñosFlow', XV_FLOW_PATH, versionName);
}

function createBodaCheckpoint(versionName) {
  return createFlowCheckpoint('BodaFlow', BODA_FLOW_PATH, versionName);
}

function restoreXVStable() {
  return restoreStableVersion('XV Años', XV_FLOW_PATH, XV_STABLE_PATH);
}

function restoreBodaStable() {
  return restoreStableVersion('Bodas', BODA_FLOW_PATH, BODA_STABLE_PATH);
}

module.exports = {
  // Funciones generales
  protectAllFlows,
  createAllCheckpoints,
  restoreAllStableVersions,
  
  // Funciones individuales
  protectXVFlow,
  protectBodaFlow,
  createXVCheckpoint,
  createBodaCheckpoint,
  restoreXVStable,
  restoreBodaStable,
  
  // Funciones de verificación
  verifyFlowIntegrity,
  createFlowCheckpoint,
  restoreStableVersion
};
