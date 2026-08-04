import { useMemo, useState } from 'react'
import useReveal from '../hooks/useReveal'

const ITEMS = [
  {
    tag: '实习经历',
    color: 'var(--cyan)',
    time: '2026.06 - 至今',
    org: '美团（北京总部）',
    role: 'AI产品运营 · Agent平台部',
    points: [
      '从0到1搭建 CatPaw AI 知识库体系，覆盖3款产品、92个高频FAQ；基于LLM对话日志做意图识别与聚类分析，驱动知识库v3.0迭代，新增20个条目及3份专项指南',
      '参与 CatClaw 对外推广，协同制定120万预算、5万注册用户目标方案（已完成）；基于沙箱API调用量与租户活跃度做漏斗分析，定位853个外网沙箱等增长驱动因素',
      '统筹 CatPaw 对外产品运营，搭建用户增长/AI对话质量/付费转化指标体系；上线首周跨端去重3,427人，单日活跃1,516人，活跃率44.2%',
    ],
  },
  {
    tag: '项目经历',
    color: 'var(--pink)',
    time: '2025.08 - 2025.12',
    org: '北京拓梦者教育科技有限公司',
    role: '品牌服务业务部',
    points: [
      '主导公司初创期运营，协助搭建市场调研、产品定位、营销策略等核心业务体系，累计服务40+教育类客户，项目交付准时率90%+',
      '负责核心AI产品「研小伴」业务对接与市场开拓，搭建流量矩阵链接超500个素人账号，累计话题曝光量突破百万',
    ],
  },
  {
    tag: '实践经历',
    color: 'var(--purple)',
    time: '2025.05 - 2026.05',
    org: '小米校园俱乐部',
    role: '甘青宁校园主理人 · 校园运营组',
    points: [
      '主导甘青宁地区12所高校精准招募，组建并管理180+人核心校园大使团队，执行十余场百人以上大型户外活动',
      '搭建运营2000+人学生社群，累计发放3000余份学生福利，社群活跃度提升80%；单次纳新活动触达超10,000人次',
    ],
  },
  {
    tag: '实践经历',
    color: 'var(--orange)',
    time: '2024.12 - 2025.12',
    org: '美团外卖',
    role: '西北校园省主管 · 校园运营组',
    points: [
      '2周内覆盖甘肃省内28所院校，2个月内落地执行8项校园推广活动；组建并领导120人校园团队，单学期实现5000+社群拉新',
      '独立策划执行20余场校园营销活动，累计完成学生认证超5000人次，拉动300张付费学期卡及2000张导流卡销售',
    ],
  },
  {
    tag: '实践经历',
    color: 'var(--yellow)',
    time: '2024.04 - 2025.04',
    org: '大疆西北新自由俱乐部',
    role: '活动策划运营 · 市场部',
    points: [
      '策划执行「大疆校园行」系列活动，覆盖两千余名学生，相关话题曝光度同比提升85%',
      '独立策划「与疆同行」「探秋」等创意营销活动，吸引超500名用户参与，促成100+单转化，销售额突破25万元',
    ],
  },
  {
    tag: '教育经历',
    color: 'var(--cyan)',
    time: '2023.09 - 2027.06',
    org: '兰州交通大学',
    role: '市场营销 · 本科',
    points: [
      'GPA 前20%（综测排名 3/42），主修市场营销、消费者行为学、企业战略管理、管理运筹学',
      '国家级一等奖：2025商务谈判全球挑战赛（负责人）；国家级三等奖：第15届全国市场调查与分析大赛（负责人）；省级金奖 ×2',
      '校园经历：市场营销2301班班长、校学生会权保部部长、沧浪诗文社社长、甘肃高校文学联合会常任理事',
    ],
  },
]

const TABS = ['全部', '实习经历', '项目经历', '实践经历', '教育经历']

export default function Experience() {
  const ref = useReveal()
  const [active, setActive] = useState('全部')

  const filtered = useMemo(
    () => (active === '全部' ? ITEMS : ITEMS.filter((it) => it.tag === active)),
    [active]
  )

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-tag">02 · Experience</div>
        <h2 className="section-title">
          一路<span className="highlight">增长</span>的
          <br />
          实战履历
        </h2>
        <p className="section-sub">
          从校园渠道运营到大厂 AI 产品运营，始终围绕「数据驱动增长」这条主线。
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
          {TABS.map((tab) => {
            const isActive = tab === active
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="font-mono"
                style={{
                  cursor: 'pointer',
                  fontSize: 13,
                  padding: '9px 18px',
                  borderRadius: 999,
                  border: isActive ? '1px solid transparent' : '1px solid var(--border)',
                  background: isActive
                    ? 'linear-gradient(90deg, var(--cyan), var(--purple))'
                    : 'transparent',
                  color: isActive ? '#0b0b12' : 'var(--ink-dim)',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>

        <div
          ref={ref}
          className="reveal"
          style={{
            position: 'relative',
            paddingLeft: 28,
            borderLeft: '2px dashed var(--border)',
          }}
        >
          {filtered.map((item, i) => (
            <div key={item.org + item.time} style={{ position: 'relative', marginBottom: i === filtered.length - 1 ? 0 : 48 }}>
              <div
                style={{
                  position: 'absolute',
                  left: -34,
                  top: 4,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 0 4px ${item.color}22`,
                }}
              />
              <div
                className="font-mono"
                style={{ fontSize: 13, color: item.color, marginBottom: 8, letterSpacing: '0.05em' }}
              >
                {item.tag} · {item.time}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>{item.org}</h3>
              <div style={{ fontSize: 15, color: 'var(--ink-dim)', marginBottom: 14 }}>{item.role}</div>
              <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
                {item.points.map((p, j) => (
                  <li key={j} style={{ color: '#d7d5e8', lineHeight: 1.75, fontSize: 15 }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
