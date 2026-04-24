/**
 * start-04-unit-long-press
 * 任務：實作穩定的長按連發與安全熔斷機制
 */

// --- 全域變數管理 ---
let moveTimer = null;      // 用於儲存 setInterval 的 ID
let safetyTimer = null;    // 用於儲存 5 秒強制停止的 setTimeout ID
let activeDirection = null; // 目前正在執行的方向

// --- UI 輔助函式 (學員可直接使用) ---
function updateUI(status = "NORMAL", isWarning = false) {
    const countEl = document.getElementById('timer-count');
    const statusEl = document.getElementById('safety-status');
    const debugEl = document.getElementById('active-timers');
    
    countEl.textContent = moveTimer ? "1" : "0";
    statusEl.textContent = status;
    statusEl.className = isWarning ? "status-value warning" : "status-value";
    
    if (moveTimer) {
        debugEl.innerHTML = `[RUNNING] Direction: ${activeDirection}\n[Timer ID] ${moveTimer}\n[Timestamp] ${new Date().toLocaleTimeString()}`;
    } else {
        debugEl.textContent = "IDLE - Waiting for input...";
    }
}

// --- 核心邏輯實作區 ---

/**
 * 開始移動 (按下按鈕)
 * @param {string} dir 方向 (UP, DOWN, LEFT, RIGHT)
 */
function startMove(dir) {
    // [TODO] 任務 1：防疊加保險
    // 提示：如果 moveTimer 已經存在，先清除它
    
    
    activeDirection = dir;
    console.log(`🚀 Start moving: ${dir}`);

    // [TODO] 任務 2：啟動連發定時器
    // 實作：每 100ms 執行一次 loop(dir)
    // moveTimer = setInterval(...)


    // [TODO] 任務 3：5秒安全熔斷 (Safety Kill-switch)
    // 實作：設定一個 5 秒後的 setTimeout，時間到則強制執行 stopMove()
    // safetyTimer = setTimeout(...)
    

    updateUI();
}

/**
 * 停止移動 (放開按鈕)
 */
function stopMove() {
    console.log("🛑 Stop moving");

    // [TODO] 任務 4：資源清理
    // 實作：清除 moveTimer 與 safetyTimer，並將變數設回 null
    

    activeDirection = null;
    updateUI();
}

/**
 * 循環指令 (由 setInterval 呼叫)
 * @param {string} dir 
 */
function loop(dir) {
    // 這裡模擬發送指令到機器人
    console.log(`📡 Sending command: MOVE_${dir}`);
}

// --- 事件監聽器設定 ---

const buttons = document.querySelectorAll('.btn-ctrl');

buttons.forEach(btn => {
    // 滑鼠/手指按下
    const handleStart = (e) => {
        e.preventDefault();
        const dir = btn.getAttribute('data-dir');
        if (dir) startMove(dir);
    };

    // 滑鼠/手指放開
    const handleEnd = (e) => {
        e.preventDefault();
        stopMove();
    };

    btn.addEventListener('mousedown', handleStart);
    btn.addEventListener('mouseup', handleEnd);
    btn.addEventListener('mouseleave', handleEnd); // 移出按鈕也停止

    // 支援觸控裝置
    btn.addEventListener('touchstart', handleStart);
    btn.addEventListener('touchend', handleEnd);
});

// [TODO] 任務 5：視窗失去焦點保護
// 提示：監聽 'blur' 事件，確保使用者切換分頁時機器人會停止
window.addEventListener('blur', () => {
    // stopMove();
});
