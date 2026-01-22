import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('contingent');
  const [selectedRecruit, setSelectedRecruit] = useState<string | null>('recruit-1');
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const menuItems = [
    { id: 'contingent', label: 'Контингент', icon: 'Users' },
    { id: 'medical', label: 'Медосвидетельствование', icon: 'Stethoscope' },
    { id: 'recommendations', label: 'Рекомендации', icon: 'Brain' },
    { id: 'reports', label: 'Отчеты', icon: 'FileText' },
    { id: 'commission', label: 'Комиссия', icon: 'Gavel' },
  ];

  const recruits = [
    { id: 'recruit-1', name: 'Иванов Петр Сергеевич', birthDate: '15.03.2005', caseNumber: '2025-001', status: 'В процессе' },
    { id: 'recruit-2', name: 'Сидоров Алексей Иванович', birthDate: '22.07.2005', caseNumber: '2025-002', status: 'Ожидает медосмотра' },
    { id: 'recruit-3', name: 'Петров Дмитрий Николаевич', birthDate: '08.11.2004', caseNumber: '2025-003', status: 'Готов к комиссии' },
  ];

  const historyData = [
    { date: '15.01.2026 14:23', author: 'Инспектор Смирнов А.В.', action: 'Создано личное дело', field: 'Анкета' },
    { date: '16.01.2026 09:15', author: 'Инспектор Смирнов А.В.', action: 'Заполнены данные анкеты', field: 'Анкета' },
    { date: '17.01.2026 11:42', author: 'Врач Кузнецова О.И.', action: 'Добавлены результаты медосмотра', field: 'Медданные' },
    { date: '18.01.2026 10:30', author: 'Психолог Васильев М.П.', action: 'Проведено психологическое тестирование', field: 'Психология' },
    { date: '20.01.2026 16:05', author: 'Инспектор Смирнов А.В.', action: 'Запрошены рекомендации ИИ', field: 'Рекомендации' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold">АИС Военкомат</h1>
          <p className="text-xs text-sidebar-foreground/70 mt-1">Система учёта призывников</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                    activeSection === item.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/80'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={16} />
            </div>
            <div className="flex-1 text-sm">
              <p className="font-medium">Смирнов А.В.</p>
              <p className="text-xs text-sidebar-foreground/70">Инспектор</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2">
              <Icon name="Search" size={20} className="text-muted-foreground" />
              <Input
                placeholder="Поиск призывника по ФИО, дате рождения или номеру дела..."
                className="max-w-2xl"
              />
            </div>
            <Button className="gap-2">
              <Icon name="Plus" size={16} />
              Новое дело
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'contingent' && selectedRecruit && (
              <div className="space-y-6 max-w-5xl">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">Иванов Петр Сергеевич</CardTitle>
                        <CardDescription className="mt-2">
                          Дата рождения: 15.03.2005 • Номер дела: 2025-001
                        </CardDescription>
                      </div>
                      <Badge>В процессе</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="anketa" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="anketa">Анкета</TabsTrigger>
                        <TabsTrigger value="medical">Медданные</TabsTrigger>
                        <TabsTrigger value="psychology">Психология</TabsTrigger>
                        <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
                        <TabsTrigger value="decision">Решение</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="anketa" className="space-y-4 mt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Фамилия</label>
                            <Input value="Иванов" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Имя</label>
                            <Input value="Петр" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Отчество</label>
                            <Input value="Сергеевич" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Дата рождения</label>
                            <Input value="15.03.2005" className="mt-1" />
                          </div>
                          <div className="col-span-2">
                            <label className="text-sm font-medium text-muted-foreground">Адрес регистрации</label>
                            <Input value="г. Москва, ул. Ленина, д. 15, кв. 42" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Образование</label>
                            <Input value="Среднее общее" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Семейное положение</label>
                            <Input value="Не женат" className="mt-1" />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="medical" className="space-y-4 mt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Результаты медицинского освидетельствования</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-sm font-medium">Категория годности</span>
                              <Badge variant="outline">А-1</Badge>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-sm font-medium">Рост</span>
                              <span className="text-sm">178 см</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-sm font-medium">Вес</span>
                              <span className="text-sm">72 кг</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-sm font-medium">Зрение (правый/левый)</span>
                              <span className="text-sm">1.0 / 1.0</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-sm font-medium">Хронические заболевания</span>
                              <span className="text-sm text-muted-foreground">Не выявлено</span>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="psychology" className="space-y-4 mt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Психологическое тестирование</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-sm font-medium">Общая оценка</span>
                              <Badge variant="outline">Высокая</Badge>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-sm font-medium">Стрессоустойчивость</span>
                              <span className="text-sm">87/100</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-sm font-medium">Коммуникабельность</span>
                              <span className="text-sm">92/100</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-sm font-medium">Лидерские качества</span>
                              <span className="text-sm">78/100</span>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="recommendations" className="space-y-4 mt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">ИИ-рекомендации</CardTitle>
                            <CardDescription>Автоматически сформированные рекомендации на основе данных</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="bg-muted p-4 rounded-md">
                              <div className="flex items-start gap-3">
                                <Icon name="Sparkles" size={20} className="text-accent mt-1" />
                                <div>
                                  <p className="font-medium mb-2">Доступно 3 рекомендации. Совпадение до 94%</p>
                                  <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Сухопутные войска: пехотные подразделения (совпадение 94%)</li>
                                    <li>• Воздушно-десантные войска: десантно-штурмовые части (совпадение 89%)</li>
                                    <li>• Специальные войска связи: радиотехнические подразделения (совпадение 76%)</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <Button 
                              className="w-full gap-2"
                              onClick={() => setShowRecommendationsModal(true)}
                            >
                              <Icon name="ExternalLink" size={16} />
                              Открыть детализацию
                            </Button>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="decision" className="space-y-4 mt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Решение комиссии</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">Решение комиссии еще не принято. После заседания здесь появится итоговое заключение.</p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">История изменений</CardTitle>
                    <CardDescription>Полный аудит действий с личным делом</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Дата и время</TableHead>
                            <TableHead>Автор</TableHead>
                            <TableHead>Действие</TableHead>
                            <TableHead>Раздел</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {historyData.map((entry, index) => (
                            <TableRow key={index}>
                              <TableCell className="text-sm">{entry.date}</TableCell>
                              <TableCell className="text-sm">{entry.author}</TableCell>
                              <TableCell className="text-sm">{entry.action}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">{entry.field}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'contingent' && !selectedRecruit && (
              <Card>
                <CardHeader>
                  <CardTitle>Список призывников</CardTitle>
                  <CardDescription>Всего записей: {recruits.length}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Дата рождения</TableHead>
                        <TableHead>Номер дела</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recruits.map((recruit) => (
                        <TableRow key={recruit.id}>
                          <TableCell className="font-medium">{recruit.name}</TableCell>
                          <TableCell>{recruit.birthDate}</TableCell>
                          <TableCell>{recruit.caseNumber}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{recruit.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedRecruit(recruit.id)}
                            >
                              Открыть
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeSection !== 'contingent' && (
              <Card>
                <CardHeader>
                  <CardTitle>{menuItems.find(item => item.id === activeSection)?.label}</CardTitle>
                  <CardDescription>Раздел находится в разработке</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Функционал данного раздела будет доступен в следующих версиях системы.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="w-80 bg-card border-l border-border p-6 overflow-y-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon name="Info" size={16} />
                    Контекстные подсказки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Заполните обязательные поля анкеты для перехода к следующему этапу. Все изменения сохраняются автоматически.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon name="Bell" size={16} />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-md">
                    <p className="text-xs font-medium mb-1">Готовы результаты медосмотра</p>
                    <p className="text-xs text-muted-foreground">Иванов П.С. • 17.01.2026</p>
                  </div>
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-md">
                    <p className="text-xs font-medium mb-1">Завершено психологическое тестирование</p>
                    <p className="text-xs text-muted-foreground">Иванов П.С. • 18.01.2026</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon name="Brain" size={16} />
                    ИИ-ассистент
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex items-start gap-2">
                        <Icon name="Sparkles" size={16} className="text-accent mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Для Иванов П.С.</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Доступно 3 рекомендации<br />Совпадение до 94%
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full" 
                      variant="outline"
                      onClick={() => setShowRecommendationsModal(true)}
                    >
                      Просмотреть детали
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <Dialog open={showRecommendationsModal} onOpenChange={setShowRecommendationsModal}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Детализация рекомендаций ИИ-ассистента</DialogTitle>
            <DialogDescription>
              Призывник: Иванов Петр Сергеевич • Дело №2025-001
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Визуализация соответствия</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { name: 'Сухопутные войска', percent: 94, color: 'bg-accent' },
                      { name: 'ВДВ', percent: 89, color: 'bg-accent/80' },
                      { name: 'Войска связи', percent: 76, color: 'bg-accent/60' },
                      { name: 'Инженерные войска', percent: 68, color: 'bg-accent/40' },
                      { name: 'Тыловые части', percent: 55, color: 'bg-accent/20' },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredBar(index)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium">{item.name}</span>
                          <span className="text-xs font-bold">{item.percent}%</span>
                        </div>
                        <div className="h-8 bg-muted rounded-md overflow-hidden relative">
                          <div 
                            className={`h-full ${item.color} transition-all duration-300`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                        {hoveredBar === index && (
                          <div className="absolute z-10 mt-2 p-3 bg-popover border border-border rounded-md shadow-lg text-xs w-64">
                            <p className="font-medium mb-1">Ключевые обоснования:</p>
                            <ul className="space-y-1 text-muted-foreground">
                              <li>• Физическая выносливость: 5/5</li>
                              <li>• Устойчивость к стрессу: 4/5</li>
                              <li>• Медицинская категория: А-1</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Детализированный список рекомендаций</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {[
                        {
                          id: 1,
                          branch: 'Сухопутные войска: пехотные подразделения',
                          percent: 94,
                          reasons: 'Высокие физические показатели, отличная стрессоустойчивость, медицинская категория А-1',
                          limitations: 'Нет ограничений',
                          details: {
                            medical: 'Рост 178 см, вес 72 кг, зрение 1.0/1.0, категория А-1 - полностью соответствует требованиям',
                            psychological: 'Стрессоустойчивость 87/100, коммуникабельность 92/100 - превышает минимальные требования (70/100)',
                            physical: 'Все показатели выше среднего, подходит для службы в полевых условиях'
                          }
                        },
                        {
                          id: 2,
                          branch: 'Воздушно-десантные войска: десантно-штурмовые части',
                          percent: 89,
                          reasons: 'Отличная физическая подготовка, высокие лидерские качества',
                          limitations: 'Требуется дополнительная проверка вестибулярного аппарата',
                          details: {
                            medical: 'Физические параметры соответствуют, рекомендуется проверка на устойчивость к высотным нагрузкам',
                            psychological: 'Лидерские качества 78/100 - хороший показатель для десантных подразделений',
                            physical: 'Выносливость и координация движений на высоком уровне'
                          }
                        },
                        {
                          id: 3,
                          branch: 'Специальные войска связи: радиотехнические подразделения',
                          percent: 76,
                          reasons: 'Среднее техническое образование, хорошая обучаемость',
                          limitations: 'Рекомендуется оценка технических навыков',
                          details: {
                            medical: 'Медицинские показатели соответствуют требованиям для службы в войсках связи',
                            psychological: 'Коммуникабельность 92/100 - важно для координации связи',
                            physical: 'Физические требования ниже, чем в боевых частях - полное соответствие'
                          }
                        },
                      ].map((recommendation) => (
                        <Collapsible key={recommendation.id}>
                          <div className="border border-border rounded-md">
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="default">{recommendation.percent}%</Badge>
                                    <h4 className="font-medium text-sm">{recommendation.branch}</h4>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                      <p className="text-muted-foreground mb-1">Ключевые обоснования:</p>
                                      <p className="text-foreground">{recommendation.reasons}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground mb-1">Потенциальные ограничения:</p>
                                      <p className="text-foreground">{recommendation.limitations}</p>
                                    </div>
                                  </div>
                                </div>
                                <CollapsibleTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setExpandedRow(expandedRow === recommendation.id ? null : recommendation.id)}
                                  >
                                    <Icon 
                                      name={expandedRow === recommendation.id ? "ChevronUp" : "ChevronDown"} 
                                      size={16} 
                                    />
                                  </Button>
                                </CollapsibleTrigger>
                              </div>
                            </div>
                            
                            <CollapsibleContent>
                              <div className="px-4 pb-4 border-t border-border pt-4 bg-muted/30">
                                <h5 className="text-xs font-semibold mb-3">Детальное сравнение параметров:</h5>
                                <div className="space-y-3 text-xs">
                                  <div>
                                    <p className="font-medium mb-1">Медицинские параметры:</p>
                                    <p className="text-muted-foreground">{recommendation.details.medical}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium mb-1">Психологические параметры:</p>
                                    <p className="text-muted-foreground">{recommendation.details.psychological}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium mb-1">Физические параметры:</p>
                                    <p className="text-muted-foreground">{recommendation.details.physical}</p>
                                  </div>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </div>
                        </Collapsible>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon name="Users" size={16} />
                    Похожие случаи (исторические аналоги)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'А-2024-157', branch: 'Сухопутные войска', success: 'Высокая', similarity: 92 },
                      { id: 'Б-2024-089', branch: 'ВДВ', success: 'Средняя', similarity: 87 },
                      { id: 'В-2023-234', branch: 'Сухопутные войска', success: 'Высокая', similarity: 85 },
                    ].map((analog, index) => (
                      <div key={index} className="p-4 border border-border rounded-md bg-muted/20">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs font-medium">Дело {analog.id}</p>
                            <p className="text-xs text-muted-foreground mt-1">Сходство профиля: {analog.similarity}%</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {analog.success}
                          </Badge>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">Направлен в:</p>
                          <p className="text-xs font-medium mt-1">{analog.branch}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter className="flex gap-3 mt-6">
            <div className="flex-1 flex gap-3">
              <Button 
                onClick={() => {
                  setShowRecommendationsModal(false);
                }}
                className="flex-1"
              >
                <Icon name="Check" size={16} className="mr-2" />
                Принять рекомендацию №1
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setShowManualSelection(!showManualSelection)}
                className="flex-1"
              >
                <Icon name="Edit" size={16} className="mr-2" />
                Выбрать вручную
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => {
                  setShowRecommendationsModal(false);
                }}
              >
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить в дело
              </Button>
            </div>
          </DialogFooter>

          {showManualSelection && (
            <div className="mt-4 p-4 border border-border rounded-md bg-muted/20">
              <h4 className="text-sm font-medium mb-3">Ручной выбор рода войск</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Выберите род войск</label>
                  <select className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md text-sm">
                    <option>Сухопутные войска</option>
                    <option>Воздушно-десантные войска</option>
                    <option>Войска связи</option>
                    <option>Инженерные войска</option>
                    <option>Тыловые части</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Причина отклонения от рекомендации ИИ <span className="text-destructive">*</span>
                  </label>
                  <Textarea 
                    placeholder="Укажите причину выбора другого рода войск..."
                    className="mt-1 min-h-20"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Обязательное поле для сбора обратной связи и дообучения модели
                  </p>
                </div>
                <Button 
                  className="w-full"
                  disabled={!rejectionReason.trim()}
                >
                  Подтвердить ручной выбор
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;