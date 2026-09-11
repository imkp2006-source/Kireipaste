import React from 'react';
import { TextStatistics } from '../../types/cleaner';
import { useLanguage } from '../../i18n/LanguageContext';

interface StatsComparisonProps {
  beforeStats: TextStatistics;
  afterStats?: TextStatistics;
  showComparison?: boolean;
}

export const StatsComparison: React.FC<StatsComparisonProps> = ({
  beforeStats,
  afterStats,
  showComparison = false,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-kirei-text-secondary">
      {/* Characters */}
      <div className="flex items-center gap-1">
        <span className="text-kirei-text-muted">{t('stats.characters')}:</span>
        <span className="font-semibold text-kirei-text-primary">
          {showComparison && afterStats ? (
            <>
              <span className="text-kirei-text-muted line-through">{beforeStats.characters}</span>
              <span className="text-kirei-yellow ml-1">{afterStats.characters}</span>
            </>
          ) : (
            beforeStats.characters
          )}
        </span>
      </div>

      {/* Words */}
      <div className="flex items-center gap-1">
        <span className="text-kirei-text-muted">{t('stats.words')}:</span>
        <span className="font-semibold text-kirei-text-primary">
          {showComparison && afterStats ? (
            <>
              {beforeStats.words !== afterStats.words ? (
                <>
                  <span className="text-kirei-text-muted line-through">{beforeStats.words}</span>
                  <span className="text-kirei-yellow ml-1">{afterStats.words}</span>
                </>
              ) : (
                afterStats.words
              )}
            </>
          ) : (
            beforeStats.words
          )}
        </span>
      </div>

      {/* Lines */}
      <div className="flex items-center gap-1">
        <span className="text-kirei-text-muted">{t('stats.lines')}:</span>
        <span className="font-semibold text-kirei-text-primary">
          {showComparison && afterStats ? (
            <>
              {beforeStats.lines !== afterStats.lines ? (
                <>
                  <span className="text-kirei-text-muted line-through">{beforeStats.lines}</span>
                  <span className="text-kirei-yellow ml-1">{afterStats.lines}</span>
                </>
              ) : (
                afterStats.lines
              )}
            </>
          ) : (
            beforeStats.lines
          )}
        </span>
      </div>

      {/* Paragraphs */}
      <div className="flex items-center gap-1 hidden sm:flex">
        <span className="text-kirei-text-muted">{t('stats.paragraphs')}:</span>
        <span className="font-semibold text-kirei-text-primary">
          {showComparison && afterStats ? afterStats.paragraphs : beforeStats.paragraphs}
        </span>
      </div>
    </div>
  );
};
